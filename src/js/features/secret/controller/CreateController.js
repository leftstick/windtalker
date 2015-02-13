/**
 *
 *  The CreateController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 13th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var CreateController = function($scope, SecretService, auth, events, $location) {

            $scope.newItem = {};
            $scope.info = {};

            $scope.items = [];

            $scope.addNewItem = function() {
                $scope.items.push({
                    key: $scope.newItem.key,
                    value: $scope.newItem.value
                });

                delete $scope.newItem.key;
                delete $scope.newItem.value;
            };

            $scope.removeItem = function(item) {
                _.remove($scope.items, {
                    key: item.key,
                    value: item.value
                });
            };

            $scope.addInfo = function() {
                var user = auth.currentUser();
                SecretService.addInfo({
                        userId: user.id,
                        name: $scope.info.name,
                        desc: $scope.info.desc,
                        items: $scope.items
                    })
                    .success(function() {
                        events.emit('alert', {
                            type: 'success',
                            message: '保密信息创建成功'
                        });
                        $location.url('secret/info');
                    })
                    .error(function(err) {
                        events.emit('alert', {
                            type: 'error',
                            message: err
                        });
                    });
            };

            $scope.$on('$destroy', function() {});
        };

        return ['$scope', 'SecretService', 'auth', 'events', '$location', CreateController];

    });


})(define);
