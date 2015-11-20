/**
 *  Gets the property value of path from all elements in collection.
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var angular = require('angular');

var pluck = function(arr, key) {
    if (!angular.isArray(arr) || arr.length === 0) {
        return [];
    }
    if (!key) {
        return arr;
    }
    return arr.map(function(a) {
        return a[key];
    });
};

module.exports = pluck;
