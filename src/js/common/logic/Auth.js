/**
 *
 *  Defines Auth service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var modulename = 'AuthModule';

        var module = angular.module(modulename, []);

        module.service('auth', [function() {

            var curUser;

            this.currentUser = function(user) {
                if (!user) {
                    return curUser;
                }
                curUser = user;
                return user;
            };

        }]);

        return {
            name: modulename
        };

    });

}(define));
