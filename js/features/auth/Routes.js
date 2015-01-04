(function (define, requirejs) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function () {
        return [{
            isDefault: true,
            when: '/',
            controller: 'LoginController',
            templateUrl: features + '/auth/partials/Login.html'
        }, {
            isDefault: false,
            when: '/forget',
            controller: 'ForgetController',
            templateUrl: features + '/auth/partials/Forget.html'
        }, {
            isDefault: false,
            when: '/signup',
            controller: 'SignupController',
            templateUrl: features + '/auth/partials/Signup.html'
        }];
    });

}(define, requirejs));