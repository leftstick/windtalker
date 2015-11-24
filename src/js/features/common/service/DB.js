/**
 *  Defines the DB Module.
 *  This module used to connect to nedb
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

var Datastore = require('nedb');
var path = require('path');

var USERS_DB_NAME = 'users.db';
var SECRETS_DB_NAME = 'secrets.db';

var DB_ADDRESS_KEY = 'windtaler.dbaddress';

class Feature extends FeatureBase {

    constructor() {
        super('DBModule');
    }

    execute() {
        this.service('DbService', [
            'StorageService',
            'events',
            function(StorageService, events) {
                var userDb, secretDb;

                this.init = function(basePath) {
                    var userDbPath = path.join(basePath, USERS_DB_NAME);
                    var secretDbPath = path.join(basePath, SECRETS_DB_NAME);
                    userDb = new Datastore({
                        filename: userDbPath,
                        autoload: true
                    });
                    secretDb = new Datastore({
                        filename: secretDbPath,
                        autoload: true
                    });
                };

                this.getUserDb = function() {
                    return userDb;
                };

                this.getSecretDb = function() {
                    return secretDb;
                };

                this.checkDbAddress = function() {
                    var hasSet = StorageService.get(DB_ADDRESS_KEY);
                    if (!hasSet) {
                        events.emit('toast', {
                            type: 'warning',
                            content: '您还没有设置数据库，请先完成该设置'
                        });
                    }
                    return !!hasSet;
                };

                this.address = function(addr) {
                    if (!addr) {
                        return StorageService.get(DB_ADDRESS_KEY);
                    }

                    StorageService.set(DB_ADDRESS_KEY, addr);
                    this.init(addr);
                };
            }
        ]);

    }
}

module.exports = Feature;
