/**
 *
 *  Defines `utils` service
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';
var ServiceBase = require('lib/ServiceBase');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '<%= password %>';

class Service extends ServiceBase {
    constructor(features, app) {
        super(features, app);
    }

    execute() {
        this.app.service('utils', [
            '$q',
            '$timeout',
            '$location',
            function($q, $timeout, $location) {

                this.delay = function(func, delay) {
                    return $timeout(func, delay);
                };

                this.redirect = function(url) {
                    $location.url(url);
                };

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

                this.getEncryptInfo = function() {
                    return {
                        algorithm: algorithm,
                        password: password
                    };
                };

                this.ID = function() {
                    return new Date().getTime() + '';
                };

            }
        ]);
    }
}

module.exports = Service;
