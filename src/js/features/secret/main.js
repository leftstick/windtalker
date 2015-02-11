/**
 * ******************************************************************************************************
 *
 *  Defines the secret
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 * ******************************************************************************************************
 */
(function(define) {
    'use strict';

    define([
        'angular',
        './Routes',
        './controller/SecretController',
        './controller/InfoController',
        './controller/CreateController',
        './controller/SettingController',
        './directive/StRatio',
        './service/SecretService'
    ], function(
        angular,
        Routes,
        SecretController,
        InfoController,
        CreateController,
        SettingController,
        StRatio,
        SecretService) {

        var moduleName = 'secret';

        var module = angular.module(moduleName, []);

        module.controller('SecretController', SecretController);
        module.controller('InfoController', InfoController);
        module.controller('CreateController', CreateController);
        module.controller('SettingController', SettingController);
        module.directive('stRatio', StRatio);
        module.service('SecretService', SecretService);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes
        };

    });

}(define));
