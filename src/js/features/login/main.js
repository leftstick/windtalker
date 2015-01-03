/**
 * ******************************************************************************************************
 *
 *  Defines the login
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 * ******************************************************************************************************
 */
(function (define) {
    'use strict';

    define([
        'angular',
        './Routes',
        './controller/LoginController'
    ], function (
        angular,
        Routes,
        LoginController) {

        var moduleName = 'login';

        var module = angular.module(moduleName, []);

        module.controller('LoginController', LoginController);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes
        };

    });

}(define));