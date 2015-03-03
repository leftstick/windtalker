/**
 *  Defines the Info Modal
 *
 *  @author  Hao.Zuo
 *  @date    Mar 3th, 2015
 *
 */
(function(define) {
    'use strict';

    var commonBase = requirejs.toUrl('common');

    define(['angular'], function(angular) {

        var moduleName = 'InfoModal';

        var common = angular.module(moduleName, []);

        common.run(['events', '$timeout', '$rootScope', function(events, $timeout, $rootScope) {

            events.on('info', function(opts) {
                if (!opts) {
                    return;
                }

                var scope = $rootScope.$new();

                scope.close = function($hide) {
                    $hide();
                    if (angular.isFunction(opts.onClose)) {
                        opts.onClose();
                    }
                };

                $timeout(function() {
                    events.emit('modal', {
                        scope: scope,
                        title: '提示',
                        backdrop: false,
                        content: opts.content,
                        animation: 'am-fade-and-slide-top',
                        template: commonBase + '/ui/info.html'
                    });
                }, 0);
            });

        }]);

        return {
            type: 'feature',
            name: moduleName
        };

    });

})(define);
