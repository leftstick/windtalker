/**
 *
 *  The entrance of ext.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([
        'jquery',
        'angular',
        'angular-route',
        'angular-animate',
        'angular-strap',
        'angular-strap-tpl',
        'angular-local-storage',
        'css!bootstrap-css',
        'css!libraries-css',
        'css!main-css'
    ], function () {

        return [{
            name: 'ngRoute'
        }, {
            name: 'ngAnimate'
        }, {
            name: 'mgcrea.ngStrap'
        }, {
            name: 'LocalStorageModule'
        }];
    });

}(define));