/**
 *  Defines the Confirm Modal
 *
 *  @author  Hao.Zuo
 *  @date    Apr 8th, 2015
 *
 */
(function(define) {
    'use strict';

    var commonBase = requirejs.toUrl('common');

    define(['angular'], function(angular) {

        var moduleName = 'ConfirmModal';

        var common = angular.module(moduleName, []);

        common.run([
            'events',
            '$rootScope',
            function(events, $rootScope) {

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

                    scope.id = opts.id;

                    events.emit('modal', {
                        scope: scope,
                        id: opts.id,
                        title: '确认',
                        content: opts.content,
                        animation: 'am-fade-and-slide-top',
                        templateUrl: commonBase + '/ui/confirm.html'
                    });
                });

            }
        ]);

        return {type: 'feature', name: moduleName};

    });

})(define);
