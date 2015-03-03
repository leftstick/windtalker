/**
 *  Defines the Confirm Modal
 *
 *  @author  Hao.Zuo
 *  @date    Mar 3th, 2015
 *
 */
(function(define) {
    'use strict';

    var commonBase = requirejs.toUrl('common');

    define(['angular'], function(angular) {

        var moduleName = 'ConfirmModal';

        var common = angular.module(moduleName, []);

        common.run(['events', '$timeout', '$rootScope', function(events, $timeout, $rootScope) {

            events.on('confirm', function(opts) {
                if (!opts) {
                    return;
                }

                var scope = $rootScope.$new();

                scope.confirm = function($hide) {
                    $hide();
                    if (angular.isFunction(opts.onConfirm)) {
                        opts.onConfirm();
                    }
                };

                $timeout(function() {
                    events.emit('modal', {
                        scope: scope,
                        title: '确认',
                        content: opts.content,
                        animation: 'am-fade-and-slide-top',
                        template: commonBase + '/ui/confirm.html'
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
