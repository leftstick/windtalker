/**
 *
 *  Defines `events` service which helps developer
 *  control EVENT system
 *
 *
 *  @author  Hao.Zuo
 *  @date    Feb 9th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular', 'lodash'], function(angular, _) {


        var definition = function(features, app) {

            var events = function($rootScope) {
                var factory = {};

                var listeners = {};

                factory.emit = function(eventName, data) {
                    if (!eventName) {
                        return;
                    }
                    $rootScope.$broadcast(eventName, data);
                };

                factory.on = function(eventName, callback) {
                    if (!listeners[eventName]) {
                        listeners[eventName] = [];
                        $rootScope.$on(eventName, function(event, data) {
                            _.each(listeners[eventName], function(listener) {
                                listener(data);
                            });
                        });

                    }
                    if (angular.isFunction(callback)) {
                        listeners[eventName].push(callback);
                    }
                };

                return factory;
            };
            app.factory('events', ['$rootScope', events]);
        };

        return {
            type: 'service',
            func: definition
        };

    });

}(define));
