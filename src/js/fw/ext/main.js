/**
 *
 *  The entrance of ext.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([
        'jquery',
        'angular',
        'angular-route',
        'angular-animate',
        'angular-strap',
        'angular-strap-tpl',
        'angular-local-storage',
        'noty',
        'css!angular-motion',
        'css!animate-css',
        'css!bootstrap-css',
        'css!main-css'
    ], function() {

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
