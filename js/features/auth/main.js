/**
 * ******************************************************************************************************
 *
 *  Defines the login
 *
 *  @author  Howard.Zuo
 *  @date    Jan 4th, 2015
 *
 * ******************************************************************************************************
 */
(function (define) {
    'use strict';

    define([
        'angular',
        './Routes',
        './lang/lang_en',
        './lang/lang_zh',
        './controller/LoginController',
        './controller/ForgetController',
        './controller/SignupController'
    ], function (
        angular,
        Routes,
        lang_en,
        lang_zh,
        LoginController,
        ForgetController,
        SignupController) {

        var moduleName = 'login';

        var module = angular.module(moduleName, []);

        module.controller('LoginController', LoginController);
        module.controller('ForgetController', ForgetController);
        module.controller('SignupController', SignupController);

        return {
            type: 'features',
            name: moduleName,
            routes: Routes,
            lang: {
                zh: lang_zh,
                en: lang_en
            }
        };

    });

}(define));