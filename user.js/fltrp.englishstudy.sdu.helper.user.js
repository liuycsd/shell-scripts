// ==UserScript==
// @name	山东大学新标准英语学习系统修复
// @namespace	tag:liuyc,2013-11-18:1
// @description	山东大学新标准英语学习系统修复，目前仅修复提交
// @include	http://202.194.15.225/book/book*/dj*.php*
// @version     0.2.1
// @grant	none
// ==/UserScript==
// @todo bind the Submit "Button" for this
// @todo support other function
var cfmdiv = document.getElementById("ConfirmDIV");
cfmdiv.style.position="relative";
cfmdiv.style.display="block";
/*unsafeWindow.getConfirm = function() {
	if ($("WebRecorderX1")) $("WebRecorderX1").style.display='none';
	if ($("RecorderDIV")) $("RecorderDIV").style.display='none'; 
	if ($("ispeechwindow")) $("ispeechwindow").style.visibility='hidden'; 
	if ($("MySpeechWindow")) $("MySpeechWindow").style.visibility='hidden'; 
	cfmdiv.style.top= -150px;
	cfmdiv.style.left=0;
	cfmdiv.style.display='block';
	return false;
}*/
