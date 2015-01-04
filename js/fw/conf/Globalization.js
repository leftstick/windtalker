/**
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

            var languages = {};

            var featureWithLang = _.filter(features, function (feature) {
                return feature.lang;
            });

            _.each(featureWithLang, function (feature) {
                _.each(feature.lang, function (value, key) {
                    if (!languages[key]) {
                        languages[key] = [];
                    }
                    _.assign(languages[key], value);
                });
            });

            //config router
            app.config(['$translateProvider', function ($translateProvider) {

                _.each(languages, function (value, key) {
                    $translateProvider.translations(key, value);
                });

                $translateProvider.preferredLanguage('zh');
                $translateProvider.fallbackLanguage('zh');

            }]);

        };

        return {
            type: 'config',
            func: config
        };

    });

}(define));