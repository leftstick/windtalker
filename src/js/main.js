/**
 *  The bootstrap of the whole windtalker application
 *
 *  @author  Howard.Zuo
 *  @date    Jan 3th, 2015
 *
 */
(function (define, doc) {
    'use strict';

    //specify each feature module here explicitly
    define([
        'angular',
        'splash',
        'lodash',
        'ext/main',
        'conf/main',
        'common/main',
        'service/main',
        'features/main'
    ], function (angular, splash, _, ext, conf, common, service, features) {

        var appName = 'windtalker';

        var depends = _.pluck(ext, 'name');

        Array.prototype.push.apply(depends, _.pluck(features, 'name'));

        var app = angular.module(appName, depends);

        _.each(conf, function (c) {
            c.func(features, app);
        });

        _.each(service, function (s) {
            s.func(features, app);
        });

        splash.destroy();

        angular.bootstrap(doc, [appName]);

        return app;
    });


}(define, document));