/**
 *
 *  Defines `utils` service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';
var ServiceBase = require('lib/ServiceBase');
var angular = require('angular');

class Service extends ServiceBase {
    constructor(features, app) {
        super(features, app);
    }

    execute() {
        this.app.service('utils', [
            '$q',
            '$window',
            function($q, $window) {

                this.base64ToString = function(str) {
                    return decodeURIComponent(escape(atob(str)));
                };

                this.stringTobase64 = function(str) {
                    return btoa(unescape(encodeURIComponent(str)));
                };

                this.promise = function(func) {
                    var promise = $q(func);
                    promise.success = function(fn) {
                        promise.then(function(response) {
                            fn(response);
                        });
                        return promise;
                    };
                    promise.error = function(fn) {
                        promise.then(null, function(response) {
                            fn(response);
                        });
                        return promise;
                    };
                    return promise;
                };

                this.stopEvent = function(e) {
                    if (!e) {
                        return;
                    }
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                };

                this.isFile = function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                };

                this.isImage = function(file) {
                    if (!file) {
                        return false;
                    }

                    var type = '|' + angular.lowercase(file.type.slice(file.type.lastIndexOf('/') + 1)) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                };

            }
        ]);
    }
}

module.exports = Service;
