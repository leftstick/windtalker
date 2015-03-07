/**
 *
 *  The entrance of logic.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 7th, 2015
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
        './KeyBoard',
        './RouteIndicator',
        './Storage'
    ], function() {
        return [].slice.apply(arguments);
    });

}(define));
