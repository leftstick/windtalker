/**
 *
 *  Defines Db service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var Datastore = require('nedb');
        var path = require('path');

        var modulename = 'DbWrapper';

        var USERS_DB_NAME = 'users.db';
        var SECRETS_DB_NAME = 'secrets.db';

        var module = angular.module(modulename, []);

        var definition = function() {

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

        };

        module.service('Db', [definition]);

        return {
            name: modulename
        };

    });

}(define));
