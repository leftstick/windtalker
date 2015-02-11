/**
 * ******************************************************************************************************
 *
 *  Defines the auth
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
        './controller/LoginController',
        './controller/ForgetController',
        './controller/SignupController',
        './controller/DBSettingController',
        './directive/FileRead',
        './service/UserService'
    ], function(
        angular,
        Routes,
        LoginController,
        ForgetController,
        SignupController,
        DBSettingController,
        FileRead,
        UserService) {

        var moduleName = 'login';

        var module = angular.module(moduleName, []);

        module.controller('LoginController', LoginController);
        module.controller('ForgetController', ForgetController);
        module.controller('SignupController', SignupController);
        module.controller('DBSettingController', DBSettingController);
        module.directive('fileread', FileRead);
        module.service('UserService', UserService);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes
        };

    });

}(define));
