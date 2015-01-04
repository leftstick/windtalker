/**
 *
 *  Defines keyboard service
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['angular', 'keymaster'], function (angular, key) {

        var modulename = 'KeyBoard';

        var module = angular.module(modulename, []);

        module.run(['$rootScope',
            function ($rootScope) {

                key('up, left', function () {});
            }
        ]);

        return {
            name: modulename
        };

    });

}(define));