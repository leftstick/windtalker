/**
 *  Defines the Autofocus Module
 *
 *  @author  Hao.Zuo
 *  @date    Mar 4th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var moduleName = 'AutofocusModule';

        var common = angular.module(moduleName, []);

        common.directive('autofocus', function() {
            return {
                restrict: 'A',
                link: function($scope, element) {
                    element[0].focus();
                }
            };
        });
        return {
            type: 'feature',
            name: moduleName
        };

    });

})(define);
