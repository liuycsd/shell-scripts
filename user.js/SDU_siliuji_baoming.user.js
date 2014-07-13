// ==UserScript==
// @name        山东大学四六级报名系统侧边栏显示脚本
// @namespace   https://github.com/liuycsd/shell-scripts/tree/master/user.js
// @description 显示山东大学四六级报名系统侧边栏
// @include     http://202.194.15.97:8888/login.jsp
// @version     0.2.1
// @grant       none
// ==/UserScript==
document.getElementsByName('content1')[0].src='http://202.194.15.97:8888/menu_m.jsp'
