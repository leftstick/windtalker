/**
 *  Entrance of common ui
 *
 *
 *  @author  Hao.Zuo
 *  @date    Mar 7th, 2015
 *
 */
(function(define) {
    'use strict';

    define([
        './alerts',
        './autofocus',
        './confirm',
        './Info',
        './modal',
        './spinner',
        './WindowResizer'
    ], function() {
        var args = [].slice.call(arguments);
        return args;
    });

}(define));
