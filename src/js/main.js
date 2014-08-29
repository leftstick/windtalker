(function(require) {

    var baseUrl = '/';

    require.config({
        baseUrl: baseUrl,
        paths: {
            'fw': 'js/fw',
            'features': 'js/features',
            'common': 'js/features/common',
            'jquery': 'bower/jquery/dist/jquery.min',
            'angular': 'bower/angular/angular.min',
            'angular-route': 'bower/angular-route/angular-route.min',
            'lodash': 'bower/lodash/dist/lodash.min',
            'bootstrap': 'bower/bootstrap/dist/js/bootstrap.min',
            'angular-translate': 'bower/angular-translate/angular-translate.min'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'lodash': {
                exports: '_'
            },
            'angular': {
                deps: ['lodash', 'jquery']
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-translate': {
                deps: ['angular']
            },
            'bootstrap': {
                deps: ['jquery']
            }
        }
    });




    require(['angular-translate', 'angular-route', 'bootstrap'], function() {

        require(['js/boot']);

    });

}(require));