/**
 *
 *  The entrance of logic.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        './Auth',
        './BackNavigatePrevent',
        './BootVerification',
        './Db',
        './RouteIndicator',
        './Storage'
    ], function() {
        return [].slice.apply(arguments);
    });

}(define));
