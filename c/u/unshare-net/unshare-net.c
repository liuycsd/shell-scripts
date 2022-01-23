/*
    unshare-net.c: Run a program with a new network namespace.
    Copyright (C) 2022  liuycsd

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sched.h>
#include <sys/mount.h>
#include <net/if.h>
#include <sys/socket.h>

int main(int argc, char** argv, char** envp) {
	if (argc <= 1 || strcmp(argv[1], "-h") == 0 || strcmp(argv[1], "--help") == 0) {
		fprintf(stderr, "Usage: %s PROGRAM [ARGS...]\n", argv[0]);
		return 0;
	}

	uid_t uid = getuid();
	gid_t gid = getgid();
	int clone_flags = CLONE_NEWNET|CLONE_NEWNS;
	if (unshare(clone_flags) != 0) {
		if (errno != EPERM) {
			perror("unshare");
			return 1;
		}
		clone_flags |= CLONE_NEWUSER;
		if (unshare(clone_flags) != 0) {
			perror("unshare");
			return 1;
		}
	}

	if (mount(NULL, "/", NULL, MS_REC|MS_SLAVE, NULL) != 0) {
		perror("mount /");
		return 1;
	}
	if (mount("sysfs", "/sys", "sysfs", 0, NULL) != 0) {
		perror("mount /sys");
		return 1;
	}

	int fd;
	fd = socket(AF_INET, SOCK_DGRAM, 0);
	if (fd < 0) {
		perror("create socket");
		return 1;
	}
	struct ifreq ifr;
	strcpy(ifr.ifr_name, "lo");
	if (ioctl(fd, SIOCGIFFLAGS, &ifr) != 0) {
		perror("ioctl SIOCGIFFLAGS");
		return 1;
	};
	if (!(ifr.ifr_flags&IFF_UP)) {
		ifr.ifr_flags |= IFF_UP;
		if (ioctl(fd, SIOCSIFFLAGS, &ifr) != 0) {
			perror("ioctl SIOCSIFFLAGS IFF_UP");
			return 1;
		};
	}
	if (close(fd) != 0) {
		perror("close socket");
		return 1;
	}

	if ((clone_flags & CLONE_NEWUSER) != 0) {
		fd = open("/proc/self/setgroups", O_WRONLY);
		if (fd < 0) {
			perror("open: /proc/self/setgroups");
			return 2;
		}
		int nwrites = write(fd, "deny", 4);
		if (nwrites < 0) {
			perror("write: /proc/self/setgroups");
			return 2;
		}
		if (nwrites < 4) {
			fprintf(stderr, "write /proc/self/setgroups: short write\n");
			return 2;
		}
		if (close(fd) != 0) {
			perror("close /proc/self/setgroups");
			return 2;
		}
		fd = open("/proc/self/uid_map", O_WRONLY);
		if (fd < 0) {
			perror("open /proc/self/uid_map");
			return 2;
		}
		if (dprintf(fd, "%d %d 1", uid, uid) < 0) {
			fprintf(stderr, "dprintf /proc/self/uid_map: fail\n");
			return 2;
		}
		if (close(fd) != 0) {
			perror("close /proc/self/uid_map");
			return 2;
		}
		fd = open("/proc/self/gid_map", O_WRONLY);
		if (fd < 0) {
			perror("open /proc/self/gid_map");
			return 2;
		}
		if (dprintf(fd, "%d %d 1", gid, gid) < 0) {
			fprintf(stderr, "dprintf /proc/self/gid_map: fail\n");
			return 2;
		}
		if (close(fd) != 0) {
			perror("close /proc/self/gid_map");
			return 2;
		}
	}
	execvpe(argv[1], argv+1, envp);
	perror("execve");
	return 1;
}
