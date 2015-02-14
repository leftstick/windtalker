/**
 * ******************************************************************************************************
 *
 *  Defines the Routes
 *
 *  @author  Howard.Zuo
 *  @date    Feb 14th, 2015
 *
 * ******************************************************************************************************
 */
(function (define, requirejs) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function () {
        return [{
            id: 'secret',
            isDefault: false,
            when: '/secret/:tab',
            controller: 'SecretController',
            templateUrl: features + '/secret/partials/Secret.html',
            windowSize: {
                width: 850,
                height: 680
            }
        }];
    });

}(define, requirejs));