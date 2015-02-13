/**
 *
 *  The InfoController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 13th, 2015
 *
 **/
(function(define) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function() {

        var InfoController = function($scope, events, SecretService) {

            $scope.displayDetail = false;

            SecretService.getInfos()
                .success(function(infos) {
                    $scope.infos = infos;
                });

            $scope.removeInfo = function(info) {
                $scope.currentInfo = info;
                events.emit('modal', {
                    scope: $scope,
                    title: '确认',
                    content: '确定要删除当前纪录么？',
                    animation: 'am-fade-and-slide-top',
                    template: features + '/secret/partials/deleteInfoModal.html'
                });
            };

            $scope.confirmDelete = function($hide) {
                delete $scope.currentInfo;
                $hide();
            };

            $scope.viewInfo = function(info) {
                $scope.currentInfo = info;
                $scope.displayDetail = true;
            };

            $scope.closeViewInfo = function() {
                delete $scope.currentInfo;
                $scope.displayDetail = false;
            };

        };

        return ['$scope', 'events', 'SecretService', InfoController];

    });


})(define);
