/**
 * ******************************************************************************************************
 *
 *  Defines the Routes
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 * ******************************************************************************************************
 */
(function (define, requirejs) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function () {
        return [{
            id: 'login',
            isDefault: false,
            when: '/login',
            controller: 'LoginController',
            templateUrl: features + '/auth/partials/Login.html'
        }, {
            id: 'forget',
            isDefault: false,
            when: '/forget',
            controller: 'ForgetController',
            templateUrl: features + '/auth/partials/Forget.html'
        }, {
            id: 'signup',
            isDefault: false,
            when: '/signup',
            controller: 'SignupController',
            templateUrl: features + '/auth/partials/Signup.html'
        }, {
            id: 'dbsetting',
            isDefault: false,
            when: '/dbsetting',
            controller: 'DBSettingController',
            templateUrl: features + '/auth/partials/DBSetting.html'
        }];
    });

}(define, requirejs));