/**
 *
 *  The entrance of logic.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([
        './BootVerification',
        './Db',
        './RouteIndicator',
        './Storage'
    ], function () {
        return [].slice.apply(arguments);
    });

}(define));