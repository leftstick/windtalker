/**
 *  A CommonJS wrapper of amazeUI
 *
 *  @author  Howard.Zuo
 *  @date    Jan 4th, 2015
 *
 */
(function (define) {
    'use strict';

    define(['lodash', 'amazeui'], function (_) {

        var definition = function () {
            define(function (requirejs) {
                return requirejs('AMUI');
            });
        };

        return {
            type: 'ext',
            func: definition
        };

    });

}(define));