/**
 *  Recursively flattens a nested array
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';

import angular from 'angular';

var flatten = function(arr) {
    var newArr = [];
    if (!arr) {
        return newArr;
    }
    if (!angular.isArray(arr)) {
        return newArr;
    }
    arr.forEach(function(item) {
        if (!angular.isArray(item)) {
            newArr.push(item);
            return;
        }
        Array.prototype.push.apply(newArr, flatten(item));
    });
    return newArr;
};

export default flatten;
