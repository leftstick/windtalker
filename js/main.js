/**
 *  The bootstrap of the whole windtalker application
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 */
(function (define, doc) {
    'use strict';

    //specify each feature module here explicitly
    define([
        'angular',
        'lodash',
        'ext/main',
        'conf/main',
        'common/main',
        'service/main',
        'features/main'
    ], function (angular, _, ext, conf, common, service, features) {

        var appName = 'windtalker';

        var depends = ext.concat(common).concat(features);

        var app = angular.module(appName, _.pluck(depends, 'name'));

        _.each(conf, function (c) {
            c.func(features, app);
        });

        _.each(service, function (s) {
            s.func(features, app);
        });

        angular.bootstrap(doc, [appName]);

        return app;
    });


}(define, document));