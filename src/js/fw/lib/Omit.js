/**
 *  This method creates an object composed of the own and inherited enumerable properties of object that are not omitted.
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';

import angular from 'angular';

var clone = function(obj) {
    if (typeof obj !== 'object' || !obj) {
        return obj;
    }
    var copy = {};
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
        }
    }
    return copy;
};

var omit = function(obj, keys) {
    if (!angular.isObject(obj)) {
        return obj;
    }
    if (angular.isArray(keys) && keys.length === 0) {
        return obj;
    }
    if (angular.isString(keys) && !keys) {
        return obj;
    }
    if (!angular.isString(keys) && !angular.isArray(keys)) {
        return obj;
    }
    var o = clone(obj);
    keys.forEach(function(key) {
        delete o[key];
    });
    return o;
};

export default omit;
