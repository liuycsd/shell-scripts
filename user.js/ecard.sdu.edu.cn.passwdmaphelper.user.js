// ==UserScript==
// @name	ecard.sdu.edu.cn Passwd Map Helper
// @namespace	tag:liuyc,2013-11-10:1
// @description	ecard.sdu.edu.cn Passwd Map Helper
// @include	http://ecard.sdu.edu.cn/homeLogin.action
// @grant	none
// ==/UserScript==
document.getElementById("layermap").style.visibility="visible";
var allpswd, thispswd;
allpswd = document.evaluate("//input[@name='passwd']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//for (var i = 0; i < allpswd.snapshotLength; i++)
//{
	i=0;
	thispswd = allpswd.snapshotItem(i);
	thispswd.id = "passwd";
	thispswd.removeAttribute("readonly"); //Don't input the raw password into the box!
//}
