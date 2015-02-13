/**
 *
 *  The entrance of whole application.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(requirejs, global) {
    'use strict';

    require.nodeRequire = global.requireNode;
    global.require = global.requireNode;

    var baseUrl = 'js/';

    requirejs.config({
        baseUrl: baseUrl,
        paths: {
            'main-css': '../css/main',

            'fw': 'fw',
            'conf': 'fw/conf',
            'ext': 'fw/ext',
            'utils': 'fw/utils',
            'common': 'common',
            'service': 'fw/service',
            'features': 'features',

            'jquery': 'bower/jquery/dist/jquery.min',
            'lodash': 'bower/lodash/dist/lodash.min',

            'angular': 'bower/angular/angular.min',
            'angular-route': 'bower/angular-route/angular-route.min',
            'angular-animate': 'bower/angular-animate/angular-animate.min',
            'angular-strap': 'bower/angular-strap/dist/angular-strap.min',
            'angular-strap-tpl': 'bower/angular-strap/dist/angular-strap.tpl.min',
            'angular-local-storage': 'bower/angular-local-storage/dist/angular-local-storage.min',
            'angular-motion': 'bower/angular-motion/dist/angular-motion.min',
            'angular-smart-table': 'bower/angular-smart-table/dist/smart-table.min',
            'ngAnimate-css': 'bower/ngAnimate/css/ng-animation',

            'noty': 'bower/noty/js/noty/packaged/jquery.noty.packaged.min',

            'animate-css': 'bower/animate.css/animate.min',
            'bootstrap-css': 'bower/bootstrap/dist/css/bootstrap.min',
            'require-css': 'bower/require-css',
            'tpl': 'bower/requirejs-tpl/tpl'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'lodash': {
                exports: '_'
            },
            'angular': {
                exports: 'angular',
                deps: ['lodash', 'jquery']
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-animate': {
                deps: ['angular']
            },
            'angular-strap-tpl': {
                deps: ['angular-strap']
            },
            'angular-strap': {
                deps: ['angular']
            },
            'angular-local-storage': {
                deps: ['angular']
            },
            'angular-smart-table': {
                deps: ['angular']
            }
        },
        map: {
            '*': {
                'css': 'require-css/css.min'
            }
        }
    });

    requirejs(['main']);

}(requirejs, this));
