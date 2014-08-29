(function(define, _) {
    'use strict';

    define([], function() {

        //only one function needs to be implemented
        //and it will be invoked with two arguments
        //features, app
        var config = function(features, app) {
            if (!features || features.length === 0) {
                console.warn('No features loaded');
                return;
            }

            //app comes form 'boot.js', 'var app = angular.module(appName, ngDependencies);'
            //config router
            app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

                    var routes = [];

                    //retrieve router from each feature
                    routes = _.chain(features)
                        .filter('routes')
                        .pluck('routes')
                        .flatten()
                        .value();

                    //config each router
                    _.each(routes, function(route) {
                        $routeProvider
                            .when(route.when, {
                                templateUrl: route.templateUrl,
                                controller: route.controller
                            });
                    });

                    //config default page
                    var defaultRouter = _.find(routes, 'isDefault');
                    if (defaultRouter) {
                        $routeProvider.otherwise({
                            redirectTo: defaultRouter.when
                        });
                    }

                }
            ]);

        };

        return config;

    });

}(define, _));