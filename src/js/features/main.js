/**
 *
 *  The entrance of features.
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([
        './login/main'
    ], function (login) {
        var values = [];
        values.push(login);
        return values;
    });

}(define));