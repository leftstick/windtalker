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

        var moduleName = 'SpinnerModule';

        var common = angular.module(moduleName, []);

        common.directive('ngSpinner', function() {
            return {
                restrict: 'AE',
                scope: {
                    theme: '@',
                    display: '='
                },
                link: function($scope, element, attr) {
                    element.addClass(attr.theme);

                    $scope.$watch('display', function(newValue) {
                        var func = newValue ? 'show' : 'hide';
                        element[func]();

                    });

                },
                template: '<div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div>'
            };
        });
        return {
            type: 'feature',
            name: moduleName
        };

    });

})(define);
