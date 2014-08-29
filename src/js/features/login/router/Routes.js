(function(define, require) {
    'use strict';

    var features = require.toUrl('features');

    define([], function() {
        return [{
            isDefault: true,
            when: '/',
            controller: 'LoginController',
            templateUrl: features + '/login/partials/login.html'
        }];
    });

}(define, require));