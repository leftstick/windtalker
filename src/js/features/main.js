/**
 *  Entrance of features
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var flatten = require('lib/Flatten');

var auth = require('./auth/main');
var common = require('./common/main');
var manager = require('./manager/main');

module.exports = flatten([common, auth, manager]);
