// ==UserScript==
// @name        山东大学本科生奖助贷管理系统导航栏显示脚本
// @namespace   https://github.com/liuycsd/shell-scripts/tree/master/user.js
// @description 显示山东大学本科生奖助贷管理系统导航栏下拉菜单
// @include     http://211.86.56.237:8080/*
// @version     0.2.1
// @grant       none
// ==/UserScript==
(function() {
  var scriptNode, targ;

  if (typeof show === 'function') {
    scriptNode = document.createElement('script');
    scriptNode.type = "text/javascript";
    scriptNode.textContent = 'show = function(item) {\n  document.getElementById(item).removeAttribute(\'hidden\');\n  openMenu = item;\n  document.getElementById(item).style.visibility=\'visible\';\n}	';
    targ = (document.getElementsByTagName('head'))[0] || document.body;
    targ.appendChild(scriptNode);
  }

  if (typeof hideit === 'function') {
    scriptNode = document.createElement('script');
    scriptNode.type = "text/javascript";
    scriptNode.textContent = 'hideit = function(item) {\n  if(! window[\'in_\'+item]) {\n    openMenu = "";\n    document.getElementById(item).style.visibility=\'hidden\';\n  }\n}';
    targ = (document.getElementsByTagName('head'))[0] || document.body;
    targ.appendChild(scriptNode);
  }

}).call(this);
