/**
 *  Defines the Modal
 *
 *  @author  Hao.Zuo
 *  @date    Feb 11th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular', 'lodash'], function(angular, _) {

        var moduleName = 'ModalWrapper';

        var defaults = {
            animation: 'am-fade',
            backdropAnimation: 'am-fade',
            placement: 'top',
            title: '',
            content: '',
            html: false,
            backdrop: true,
            keyboard: true,
            show: true,
            container: false,
            contentTemplate: false,
            prefixEvent: 'modal',
            id: ''
        };

        var common = angular.module(moduleName, []);

        common.run(['events', '$modal', function(events, $modal) {

            events.on('modal', function(opts) {
                $modal(_.defaults(opts, defaults));
            });

        }]);

        return {
            type: 'feature',
            name: moduleName
        };

    });

})(define);
