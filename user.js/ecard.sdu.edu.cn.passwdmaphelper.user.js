// ==UserScript==
// @name	山东大学校园卡系统登录密码键盘显示脚本
// @namespace	https://github.com/liuycsd/shell-scripts/tree/master/user.js
// @description	山东大学校园卡系统登录密码键盘显示修正
// @include	http://ecard.sdu.edu.cn/homeLogin.action
// @version     0.2.1
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
