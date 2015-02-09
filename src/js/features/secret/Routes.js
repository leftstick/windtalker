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
            id: 'secret',
            isDefault: false,
            when: '/secret',
            controller: 'SecretController',
            templateUrl: features + '/secret/partials/Secret.html',
            windowSize: {
                width: 700,
                height: 650
            }
        }];
    });

}(define, requirejs));
