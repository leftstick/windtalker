/**
 *
 *  The entrance of features.
 *
 *  @author  Howard.Zuo
 *  @date    Jan 4th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([
        './auth/main'
    ], function (auth) {
        var values = [];
        values.push(auth);
        return values;
    });

}(define));