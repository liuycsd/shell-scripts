// ==UserScript==
// @name	FLTRP SDU -- submit Helper
// @namespace	tag:liuyc,2013-11-18:1
// @description	FLTRP ONLINE ENGLISH STUDY SYSTEM in SDU -- Submit Helper
// @include	http://202.194.15.225/book/book*/dj*.php*
// @version     0.2
// @grant	none
// ==/UserScript==
// TODO bind the Submit "Button" for this
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
