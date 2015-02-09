/**
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 */
(function(define, global) {
    'use strict';

    var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'd6F3Efeq';


    define(['angular'], function(angular) {


        var definition = function(features, app) {

            var utils = function($q) {

                this.base64ToString = function(str) {
                    return global.decodeURIComponent(global.escape(global.atob(str)));
                };

                this.stringTobase64 = function(str) {
                    return global.btoa(global.unescape(global.encodeURIComponent(str)));
                };

                this.handyDefer = function() {
                    var deferred = $q.defer();
                    var promise = deferred.promise;
                    promise.success = function(fn) {
                        promise.then(function(response) {
                            fn(response.data);
                        });
                        return promise;
                    };
                    promise.error = function(fn) {
                        promise.then(null, function(response) {
                            fn(response.data);
                        });
                        return promise;
                    };
                    return deferred;
                };

                this.formEncodedOpts = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    transformRequest: function(data) {
                        // If this is not an object, defer to native stringification.
                        if (!angular.isObject(data)) {
                            return (!data ? '' : data.toString());
                        }
                        var buffer = [];
                        // Serialize each key in the object.
                        for (var name in data) {
                            if (!data.hasOwnProperty(name)) {
                                continue;
                            }
                            var value = data[name];
                            buffer.push(
                                encodeURIComponent(name) +
                                '=' +
                                encodeURIComponent(!value ? '' : value)
                            );
                        }
                        // Serialize the buffer and clean it up for transportation.
                        return buffer
                            .join('&')
                            .replace(/%20/g, '+');
                    }
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

                this.encryptTxt = function(text) {
                    var cipher = crypto.createCipher(algorithm, password);
                    var crypted = cipher.update(text, 'utf8', 'hex');
                    crypted += cipher.final('hex');
                    return crypted;
                };

                this.decryptTxt = function(text) {
                    var decipher = crypto.createDecipher(algorithm, password);
                    var dec = decipher.update(text, 'hex', 'utf8');
                    dec += decipher.final('utf8');
                    return dec;
                };

                this.ID = function() {
                    return new Date().getTime() + '';
                };

            };
            app.service('utils', ['$q', utils]);
        };

        return {
            type: 'service',
            func: definition
        };

    });

}(define, window));
