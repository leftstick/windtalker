/**
 *
 *  Defines BootVerification service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['angular'], function (angular) {

        var modulename = 'BootVerification';

        var module = angular.module(modulename, []);

        module.service('boot', ['storage', 'Db', function (storage, Db) {

            this.firstTime = function () {
                return !storage.get('dbset');
            };

            this.setDb = function (db) {
                storage.set('dbset', db);
                Db.init(db);
            };

            this.getDb = function () {
                return storage.get('dbset');
            };

        }]);

        module.run(['$rootScope', 'boot', '$location', 'Db', function ($rootScope, boot, $location, Db) {
            if (boot.firstTime()) {
                $location.url('dbsetting');
            } else {
                $location.url('login');
                Db.init(boot.getDb());
            }
        }]);

        return {
            name: modulename
        };

    });

}(define));