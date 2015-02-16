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

            $scope.info = {};

            $scope.info.displayDetail = false;

            SecretService.getInfos()
                .success(function(infos) {
                    $scope.info.infos = infos;
                });

            $scope.info.removeInfo = function(info) {
                $scope.info.currentInfo = info;
                events.emit('modal', {
                    scope: $scope,
                    title: '确认',
                    content: '确定要删除当前纪录么？',
                    animation: 'am-fade-and-slide-top',
                    template: features + '/secret/partials/deleteInfoModal.html'
                });
            };

            $scope.info.confirmDelete = function($hide) {
                delete $scope.info.currentInfo;
                $hide();
            };

            $scope.info.viewInfo = function(info) {
                $scope.info.currentInfo = info;
                $scope.info.displayDetail = true;
            };

            $scope.info.closeViewInfo = function() {
                delete $scope.info.currentInfo;
                $scope.info.displayDetail = false;
            };

            $scope.$on('$destroy', function() {
                delete $scope.info.infos;
            });

        };

        return ['$scope', 'events', 'SecretService', InfoController];

    });


})(define);
