/**
 * ******************************************************************************************************
 *
 *  Defines the Routes
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 * ******************************************************************************************************
 */
(function(define, requirejs) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function() {
        return [{
            id: 'login',
            isDefault: false,
            when: '/login',
            controller: 'LoginController',
            templateUrl: features + '/auth/partials/Login.html',
            windowSize: {
                width: 475,
                height: 375
            }
        }, {
            id: 'forget',
            isDefault: false,
            when: '/forget',
            controller: 'ForgetController',
            templateUrl: features + '/auth/partials/Forget.html',
            windowSize: {
                width: 475,
                height: 425
            }
        }, {
            id: 'signup',
            isDefault: false,
            when: '/signup',
            controller: 'SignupController',
            templateUrl: features + '/auth/partials/Signup.html',
            windowSize: {
                width: 475,
                height: 525
            }
        }, {
            id: 'dbsetting',
            isDefault: false,
            when: '/dbsetting',
            controller: 'DBSettingController',
            templateUrl: features + '/auth/partials/DBSetting.html',
            windowSize: {
                width: 475,
                height: 415
            }
        }];
    });

}(define, requirejs));
