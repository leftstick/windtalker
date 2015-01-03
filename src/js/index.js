(function (require) {
    'use strict';

    var baseUrl = '/js/';

    require.config({
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
            'angular': 'bower/angular/angular.min',
            'angular-route': 'bower/angular-route/angular-route.min',
            'angular-translate': 'bower/angular-translate/angular-translate.min',
            'angular-animate': 'bower/angular-animate/angular-animate.min',
            'lodash': 'bower/lodash/dist/lodash.min',
            'keymaster': 'bower/keymaster/keymaster',
            'amazeui-css': 'bower/amazeui/dist/css/amazeui.min',
            'require-css': 'bower/require-css',
            'tpl': 'bower/requirejs-tpl/tpl',
            'splash': 'libs/splash',
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'lodash': {
                exports: '_'
            },
            'keymaster': {
                exports: 'keymaster'
            },
            'angular': {
                exports: 'angular',
                deps: ['lodash', 'jquery']
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-translate': {
                deps: ['angular']
            },
            'angular-animate': {
                deps: ['angular']
            }
        },
        map: {
            '*': {
                'css': 'require-css/css.min'
            }
        }
    });

    require(['splash', 'css!splash'], function (splash) {
        splash.enable('tailing');
    });

    require(['main']);

}(require));