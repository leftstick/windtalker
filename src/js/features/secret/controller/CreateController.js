/**
 *
 *  The CreateController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 5th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var CreateController = function($scope, SecretService, auth, events, $location, utils) {

            $scope.create = {};

            $scope.create.newItem = {};
            $scope.create.info = {};
            $scope.create.edit = {};

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

            $scope.create.enableEditItem = function(item) {
                item.isEditing = true;
                item.editKey = item.key;
                item.editValue = item.value;
            };

            $scope.create.edit.cancelEditItem = function(item, $event) {
                utils.stopEvent($event);
                item.isEditing = false;
                item.editKey = item.key;
                item.editValue = item.value;
            };

            $scope.create.edit.editItem = function(item, $event) {
                utils.stopEvent($event);
                item.isEditing = false;
                item.key = item.editKey;
                item.value = item.editValue;
            };

            $scope.$on('$destroy', function() {});
        };

        return ['$scope', 'SecretService', 'auth', 'events', '$location', 'utils', CreateController];

    });


})(define);
