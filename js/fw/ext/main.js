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
        'amazeui',
        'css!amazeui-css',
        'css!animate-css',
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