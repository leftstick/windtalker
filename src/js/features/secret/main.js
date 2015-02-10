/**
 * ******************************************************************************************************
 *
 *  Defines the secret
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 * ******************************************************************************************************
 */
(function(define) {
    'use strict';

    define([
        'angular',
        './Routes',
        './controller/SecretController',
        './controller/InfoManagementController',
        './controller/CreateController',
        './controller/SettingController'
    ], function(
        angular,
        Routes,
        SecretController,
        InfoManagementController,
        CreateController,
        SettingController) {

        var moduleName = 'secret';

        var module = angular.module(moduleName, []);

        module.controller('SecretController', SecretController);
        module.controller('InfoManagementController', InfoManagementController);
        module.controller('CreateController', CreateController);
        module.controller('SettingController', SettingController);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes
        };

    });

}(define));
