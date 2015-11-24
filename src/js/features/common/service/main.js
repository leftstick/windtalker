/**
 *  Entrance of common service
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';

var authService = require('./AuthService');
var db = require('./DB');
var storageService = require('./StorageService');

module.exports = [authService, db, storageService];
