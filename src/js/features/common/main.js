/**
 *  Entrance of common service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var ui = require('./ui/main');
var service = require('./service/main');
var listener = require('./listener/main');

module.exports = [...ui, ...service, ...listener];
