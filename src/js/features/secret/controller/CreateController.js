/**
 *
 *  The CreateController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 16th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var CreateController = function($scope, SecretService, auth, events, $location) {

            $scope.create = {};

            $scope.create.newItem = {};
            $scope.create.info = {};

            $scope.create.items = [];

            $scope.create.addNewItem = function() {
                $scope.create.items.push({
                    key: $scope.create.newItem.key,
                    value: $scope.create.newItem.value
                });

                delete $scope.create.newItem.key;
                delete $scope.create.newItem.value;
            };

            $scope.create.removeItem = function(item) {
                _.remove($scope.create.items, {
                    key: item.key,
                    value: item.value
                });
            };

            $scope.create.addInfo = function() {
                var user = auth.currentUser();
                SecretService.addInfo({
                        userId: user.id,
                        name: $scope.create.info.name,
                        desc: $scope.create.info.desc,
                        items: $scope.create.items
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
