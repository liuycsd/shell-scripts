#! /bin/sh
if [ "$1" ];then
f="$1"
fo="/tmp/imgmplayer/$(data '+%s').avi"
shift
if [ ! -d '/tmp/imgmplayer' ];then mkdir -p '/tmp/imgmplayer';fi
mencoder "mf://${f}" "mf://${f}" -fps 0.2 -oac copy -ovc raw -o "${fo}" && mplayer $@ "${fo}"
rm "${fo}"
fi
