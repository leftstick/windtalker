/**
 *
 *  The entrance of features.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        './auth/main',
        './secret/main'
    ], function() {
        return [].slice.apply(arguments);
    });

}(define));
