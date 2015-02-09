/**
 * ******************************************************************************************************
 *
 *  Defines the secret
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 * ******************************************************************************************************
 */
(function(define) {
    'use strict';

    define([
        'angular',
        './Routes',
        './controller/SecretController'
    ], function(
        angular,
        Routes,
        SecretController) {

        var moduleName = 'secret';

        var module = angular.module(moduleName, []);

        module.controller('SecretController', SecretController);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes
        };

    });

}(define));
