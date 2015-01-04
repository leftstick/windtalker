/**
 *  The RouterConfig collect the route information from each feature and give a
 *  complete configuration of the application.
 *
 *  Note: this module is part of application-level framework, developers should
 *        never care about
 *
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['lodash'], function (_) {

        var config = function (features, app) {
            if (!features || features.length === 0) {
                console.warn('No features loaded');
                return;
            }

            //config router
            app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

                var routes = [];

                //retrieve router from each feature
                _.each(features, function (feature) {
                    if (!feature.routes) {
                        return;
                    }
                    _.each(feature.routes, function (route) {
                        routes.push(route);
                    });
                });

                //config each router
                _.each(routes, function (route) {
                    $routeProvider
                        .when(route.when, {
                            templateUrl: route.templateUrl,
                            controller: route.controller
                        });
                });

                //config default page
                var defPage = _.find(routes, {
                    isDefault: true
                });
                if (defPage) {
                    $routeProvider.otherwise({
                        redirectTo: defPage.when
                    });
                }

                $locationProvider.html5Mode({
                    enabled: false
                });
            }]);

            var routes = _.chain(features)
                .pluck('routes')
                .where(Boolean)
                .flatten()
                .value();

            app.constant('Routes', routes);

        };

        return {
            type: 'config',
            func: config
        };

    });

}(define));