/**
 *
 *  The entrance of logic.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 9th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        './Auth',
        './BackNavigatePrevent',
        './BootVerification',
        './CloseBlocker',
        './Db',
        './Exit',
        './KeyBoard',
        './RouteIndicator',
        './Storage'
    ], function() {
        return [].slice.apply(arguments);
    });

}(define));
