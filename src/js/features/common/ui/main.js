/**
 *  Entrance of common ui
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
 *
 */
'use strict';

var autofocus = require('./Autofocus');
var bottomSheet = require('./BottomSheet');
var confirm = require('./Confirm');
var dialog = require('./Dialog');
var info = require('./Info');
var sidebar = require('./Sidebar');
var toast = require('./Toast');

module.exports = [
    autofocus,
    bottomSheet,
    confirm,
    dialog,
    info,
    sidebar,
    toast
];
