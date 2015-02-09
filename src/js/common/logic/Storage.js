/**
 *
 * Defines Storage service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['angular'], function (angular) {

        var modulename = 'Storage';

        var module = angular.module(modulename, []);

        module.service('storage', ['localStorageService',

            function (localStorageService) {
                this.get = localStorageService.get;
                this.set = localStorageService.set;
            }
        ]);

        return {
            name: modulename
        };

    });

}(define));