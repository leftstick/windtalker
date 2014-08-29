(function(define, _, angular) {
    'use strict';

    //specify each configure module, feature module here explicitly
    define([
        'fw/RouteConfig',
        'features/login/main'
    ], function() {

            var appName = 'password-keeper';
            var modules = Array.prototype.slice.call(arguments, 0);

            var features = _.chain(modules).filter(angular.isObject).filter('name').value();

            var ngDependencies = ['ngRoute'];

            ngDependencies = _.chain(features).filter('name').pluck('name').value().concat(ngDependencies);

            var configModules = _.filter(modules, angular.isFunction);

            var app = angular.module(appName, ngDependencies);

            for (var i = 0; i < configModules.length; i++) {
                var module = configModules[i];
                module(features, app);
            }

            angular.bootstrap(document, [appName]);

            return app;
        });

}(define, _, angular));