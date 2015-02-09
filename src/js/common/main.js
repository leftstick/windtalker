/**
 *
 *  The entrance of common.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        './logic/main',
        './ui/main'
    ], function(logic, ui) {
        var values = logic.concat(ui);
        return values;
    });

}(define));
