/**
 *
 *  The entrance of logic.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        './Auth',
        './BootVerification',
        './Db',
        './RouteIndicator',
        './Storage'
    ], function() {
        return [].slice.apply(arguments);
    });

}(define));
