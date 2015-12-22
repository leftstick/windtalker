/**
 *  Entrance of common listener
 *
 *  @author  Howard.Zuo
 *  @date    Dec 22, 2015
 *
 */
'use strict';

var boot = require('./BootVerification');
var menuListener = require('./MenuListener');
var indicator = require('./RouteIndicator');
var routeListener = require('./RouteListener');

module.exports = [
    boot,
    menuListener,
    indicator,
    routeListener
];
