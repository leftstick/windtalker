/**
 *
 *  Defines `events` service which helps developer
 *  control EVENT system
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';
import ServiceBase from 'lib/ServiceBase';
import angular from 'angular';

class Service extends ServiceBase {
    constructor(features, app) {
        super(features, app);
    }

    execute() {
        this.app.factory('events', [
            '$rootScope',
            function($rootScope) {
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
                            listeners[eventName].forEach(function(listener) {
                                listener(data);
                            });
                        });

                    }
                    if (angular.isFunction(callback)) {
                        listeners[eventName].push(callback);
                    }
                };

                factory.off = function(eventName, callback) {
                    if (!listeners[eventName]) {
                        return;
                    }
                    for (var i = 0; i < listeners[eventName].length; i++) {
                        if (listeners[eventName][i] === callback) {
                            listeners[eventName].splice(i, 1);
                            return;
                        }
                    }
                };

                return factory;
            }
        ]);
    }
}

export default Service;
