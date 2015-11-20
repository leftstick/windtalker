/**
 *  Entrance of common listener
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var boot = require('./BootVerification');
var indicator = require('./RouteIndicator');
var routeListener = require('./RouteListener');

module.exports = [boot, indicator, routeListener];
