/**
 *  Defines the SearchFilter
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';

var SearchFilter = function() {
    return function(input, txt, params) {
        if (!txt) {
            return input;
        }
        return input.filter(function(item) {
            return params.filter(function(key) {
                return item[key].indexOf(txt) > -1;
            }).length;
        });
    };
};

module.exports = [SearchFilter];
