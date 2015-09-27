// ==UserScript==
// @name        山东大学部分老系统侧边栏（menu_m.asp）显示脚本
// @namespace   https://github.com/liuycsd/shell-scripts/tree/master/user.js
// @description 显示山东大学部分老系统侧边栏（menu_m.asp）
// @include     http://202.194.15.97:8888/login.jsp
// @include     http://211.86.56.237:8080/xsgl/student/index_menu.jsp
// @version     0.2.2
// @grant       none
// ==/UserScript==
document.getElementsByName('content1')[0].src='menu_m.jsp'
