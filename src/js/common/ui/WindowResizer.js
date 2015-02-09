/**
 *
 *  Defines WindowResizer service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var modulename = 'WindowResizer';

        var module = angular.module(modulename, []);

        var gui = require('nw.gui');
        var win = gui.Window.get();

        module.run(['$rootScope',
            function($rootScope) {

                $rootScope.$on('$routeChangeSuccess', function(e, route) {

                    if (route && route.$$route && route.$$route.windowSize) {
                        win.resizeTo(route.$$route.windowSize.width, route.$$route.windowSize.height);
                    }
                });
            }
        ]);

        return {
            name: modulename
        };

    });

}(define));
