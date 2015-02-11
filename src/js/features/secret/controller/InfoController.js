/**
 *
 *  The InfoController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 **/
(function(define) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function() {

        var InfoController = function($scope, events, SecretService) {

            $scope.infos = [{
                name: 'http://www.baidu.com',
                desc: '百度的小玩意'
            }];

            $scope.removeInfo = function(info) {
                $scope.currentInfo = info;
                events.emit('modal', {
                    scope: $scope,
                    title: '确认',
                    content: '确定要删除当前纪录么？',
                    template: features + '/secret/partials/deleteInfoModal.html'
                });
            };

            $scope.confirmDelete = function($hide) {
                console.log($scope.currentInfo);
                $hide();
            };

        };

        return ['$scope', 'events', 'SecretService', InfoController];

    });


})(define);
