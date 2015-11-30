/**
 *  Defines the StorageService Module.
 *  This module used to control data in LocalStorage
 *
 *  @author  Howard.Zuo
 *  @date    Nov 30, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('StorageModule');
    }

    StorageService($window) {
        var storage = $window.localStorage;

        this.get = function(key) {
            return storage.getItem(key) || '';
        };

        this.indexOf = function(i) {
            if (!storage.key(i)) {
                return '';
            }
            return storage.getItem(storage.key(i));
        };

        this.set = function(key, value) {
            storage.setItem(key, value);
        };

        this.remove = function(key) {
            storage.removeItem(key);
        };

        this.removeAll = function() {
            storage.clear();
        };
    }

    execute() {
        this.StorageService.$inject = ['$window'];
        this.service('StorageService', this.StorageService);
    }
}

module.exports = Feature;
