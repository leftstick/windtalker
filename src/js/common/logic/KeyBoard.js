/**
 *
 *  Defines KeyBoard service
 *
 *  @author  Howard.Zuo
 *  @date    Mar 6th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular', 'keymaster'], function(angular, key) {

        var modulename = 'KeyBoardModule';

        var module = angular.module(modulename, []);

        module.service('key', [function() {

            this.nonBlockMode = function() {
                key.filter = function() {
                    return true;
                };
            };

            this.defaultMode = function() {
                key.filter = function(event) {
                    var tagName = (event.target || event.srcElement).tagName;
                    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
                };
            };

            this.on = function() {
                var args = [].slice.apply(arguments);
                key.apply(undefined, args);
            };

            this.off = function() {
                var args = [].slice.apply(arguments);
                key.unbind.apply(undefined, args);
            };

        }]);

        return {
            name: modulename
        };

    });

}(define));
