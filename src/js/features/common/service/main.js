/**
 *  Entrance of common service
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var db = require('./DB');
var storageService = require('./StorageService');

module.exports = [db, storageService];
