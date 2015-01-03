/**
 *
 *  The entrance of ext.
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([
        'jquery',
        'keymaster',
        'angular',
        'angular-route',
        'angular-animate',
        'angular-translate',
        'css!amazeui-css',
        'css!main-css'
    ], function () {

        return [{
            name: 'ngRoute'
        }, {
            name: 'ngAnimate'
        }, {
            name: 'pascalprecht.translate'
        }];
    });

}(define));