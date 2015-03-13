/**
 *
 *  The entrance of ext.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 13th, 2015
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
        'angular-smart-table',
        'angular-theme-spinner',
        'noty',
        'keymaster',
        'css!angular-theme-spinner',
        'css!angular-motion',
        'css!animate-css',
        'css!bootstrap-css',
        'css!ngAnimate-css',
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
        }, {
            name: 'smart-table'
        }, {
            name: 'angular-theme-spinner'
        }];
    });

}(define));
