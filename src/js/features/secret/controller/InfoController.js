/**
 *
 *  The InfoController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var InfoController = function($scope, events) {

            $scope.infos = [{
                name: 'http://www.baidu.com',
                desc: '百度的小玩意'
            }];

            $scope.removeInfo = function(info) {
                events.emit('alert', {
                    message: '确定要删除选中信息么？',
                    type: 'confirm',
                    onClose: function() {
                        console.log(arguments);
                    }
                });
            };

        };

        return ['$scope', 'events', InfoController];

    });


})(define);
