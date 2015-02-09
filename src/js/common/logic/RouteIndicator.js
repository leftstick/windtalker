/**
 *
 *  Defines RouteIndicator service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['angular', 'lodash', 'jquery'], function (angular, _, $) {

        var modulename = 'RouteIndicator';

        var module = angular.module(modulename, []);

        var $body = $('body');

        module.run(['$rootScope', 'Routes',
            function ($rootScope, Routes) {

                var classes = _.pluck(Routes, 'id').join(' ');

                $rootScope.$on('$routeChangeSuccess', function (e, route) {
                    $body.removeClass(classes);

                    if (route && route.$$route && route.$$route.id) {
                        $body.addClass(route.$$route.id);
                    }
                });
            }
        ]);

        return {
            name: modulename
        };

    });

}(define));