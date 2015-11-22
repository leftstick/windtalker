/**
 *  Entrance of common ui
 *
 *  @author  Howard.Zuo
 *  @date    Nov 22, 2015
 *
 */
'use strict';

var autofocus = require('./Autofocus');
var bottomSheet = require('./BottomSheet');
var confirm = require('./Confirm');
var dialog = require('./Dialog');
var toast = require('./Toast');

module.exports = [
    autofocus,
    bottomSheet,
    confirm,
    dialog,
    toast
];
