#! /bin/bash
# @author liuyc (liuycsd@github)
# @license GNU GPL v3 or later
# @version 1.0.1
# (c)2014 liuyc (liuycsd@github)
if test "$#" -gt 1;then
	t="$(mktemp -t -d vsnpXXXX)"
	i="$(ffmpeg -i $1 -frames:v 0 -f null /dev/null 2>&1 |grep -Po '(Duration: [0-9:\.]*,)|(Stream #0.*$)')"
	d=$(echo "$i"|grep -m 1 -Po '[0-9:\.]{2,}'|awk -F':' '{print $1*3600+$2*60+$3;}')
	v="$(echo $i|sed 's|Stream|\n|g'|grep -m 1 -Po 'Video:.*$')"
	a="$(echo $i|sed 's|Stream|\n|g'|grep -m 1 -Po 'Audio:.*$')"
	z=$(echo "$i"|grep -m 1 -Po '[0-9][0-9]+x[0-9]*')
	if [ "$5" != '' ] && [ $5 -gt 0 ];then
		x=$5
	else
		x=$(echo $z|awk -Fx '{print $1}')
	fi
	if [ "$6" != '' ] && [ $6 -gt 0 ];then
		y=$6
	else
		y=$(echo $z|awk -Fx '{print $2}')
	fi
	if [ "$3" != '' ] && [ $3 -gt 0 ];then
		c=$3
	else
		c=4
	fi
	if [ "$4" != '' ] && [ $4 -gt 0 ];then
		r=$4
	else
		r=4
	fi
	m=$((r*c))
	d=$(awk 'BEGIN{print '$d/$m'}')
	xx=$x
	yy=$y
	x=$((x-2*c-8))
	x=$((x/c))
	y=$((y-2*r-x/3))
	y=$((y/r))
	for(( i=0 ;i<m; i++ ))
	do
		s=$(awk 'BEGIN{print '$d'*'$i'+'$d'/2}')
		ss=$(awk 'BEGIN{printf "%d", '$s'}')
		sm=$((ss/60))
		sh=$((ss/60/60))
		sm=$(awk 'BEGIN{printf "%02d", '$((sm%60))'}')
		ss=$(awk 'BEGIN{printf "%02d", '$((ss%60))'}')
		echo -e "Processing ($i/$m)\r"
		ffmpeg -v 0 -y -ss "$s" -i "$1" -s "${x}x${y}" -frames:v 1 -vf "drawtext=text=\'${sh}:${sm}:${ss}\':fontsize=$((x/8)):fontcolor=blue@0.5:shadowy=2" "${t}/$(printf '%04d' $i).jpg" 2>&1 >/dev/null
	done
	echo -e "Montaging...\r"
	montage  "${t}/"[0-9][0-9][0-9][0-9].jpg -tile "${c}x${r}" -geometry ${x}x${y}'+2+2' -background 'rgb(255,255,255)' "${t}/000t.jpg"
	echo -e "Composing...\n"
	convert -size "${xx}x${yy}" -gravity northwest -fill yellow -weight 2 -pointsize $((x/18)) -annotate '+2+2' "File:$1\n$v\n$a" xc:none "$2"
	composite -gravity southeast -geometry -0-0 "${t}/000t.jpg" "$2" "$2"
	rm -r "$t"
else
	printf "$0 IN_FILE OUT_FILE [COW] [ROL] [X] [Y]\nGet a snapshot of IN_FILE with COLxROL (default 4x4) sub snapshot(s) as OUT_FILE.\n"
fi
