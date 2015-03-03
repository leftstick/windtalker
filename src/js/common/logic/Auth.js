/**
 *
 *  Defines Auth service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 16th, 2015
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

            this.logout = function() {
                curUser = undefined;
            };

            this.questions = function() {
                return [{
                    'label': '父亲的名字',
                    'value': 'FATHER_NAME'
                }, {
                    'label': '母亲的名字',
                    'value': 'MOTHER_NAME'
                }, {
                    'label': '小学的名字',
                    'value': 'PRIMARY_SCHOOL_NAME'
                }, {
                    'label': '第一只宠物的名字',
                    'value': 'FIRST_PET_NAME'
                }];
            };

        }]);

        return {
            name: modulename
        };

    });

}(define));
