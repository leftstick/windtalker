/**
 *
 *  The InfoController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 6th, 2015
 *
 **/
(function(define, global) {
    'use strict';

    define(['angular', 'lodash'], function(angular, _) {

        var InfoController = function($scope, events, SecretService, utils, $timeout, key) {

            $scope.info = {};
            $scope.info.originInfos = [];
            $scope.info.edit = {};

            $scope.info.displayDetail = false;

            $scope.info.hintMsg = '双击复制';

            var refreshInfos = function(callback) {
                $scope.info.showSpinner = true;
                $timeout(function() {
                    SecretService.getInfos($scope.user.id)
                        .success(function(infos) {
                            $scope.info.showSpinner = false;
                            $scope.info.originInfos = infos;
                            $scope.info.infos = [].concat($scope.info.originInfos);
                            if (angular.isFunction(callback)) {
                                callback($scope.info.infos);
                            }
                        });

                }, 100);
            };


            refreshInfos();



            $scope.info.removeInfo = function(info, $event) {
                utils.stopEvent($event);
                $scope.info.currentInfo = info;
                events.emit('confirm', {
                    content: '确定要删除当前纪录么？',
                    onConfirm: function() {
                        SecretService.removeInfo($scope.info.currentInfo)
                            .success(function() {
                                _.remove($scope.info.originInfos, {
                                    id: $scope.info.currentInfo.id
                                });
                                delete $scope.info.currentInfo;
                                events.emit('alert', {
                                    type: 'success',
                                    message: '信息删除成功'
                                });
                            })
                            .error(function(err) {
                                events.emit('alert', {
                                    type: 'error',
                                    message: err
                                });
                            });
                    }
                });
            };

            $scope.info.viewInfo = function(info, $event) {
                utils.stopEvent($event);
                $scope.info.currentInfo = info;
                $scope.info.displayDetail = true;
                key.nonBlockMode();
                key.on('⌘+w, ctrl+w', function(e) {
                    utils.stopEvent(e);
                    $scope.info.closeViewInfo();
                    $scope.$apply();
                });
            };

            $scope.info.closeViewInfo = function() {
                delete $scope.info.currentInfo;
                $scope.info.displayDetail = false;
                $scope.info.isEditing = false;
                key.off('⌘+w, ctrl+w');
                key.defaultMode();
            };

            $scope.info.toggleEdit = function(isEdit, $event) {
                utils.stopEvent($event);
                $scope.info.isEditing = isEdit;
                if (isEdit) {
                    $scope.info.edit.info = angular.copy($scope.info.currentInfo);
                    $scope.info.edit.newItem = {};
                } else {
                    delete $scope.info.edit.info;
                    delete $scope.info.edit.newItem;
                }
            };

            $scope.info.edit.addNewItem = function() {
                $scope.info.edit.info.items.push({
                    key: $scope.info.edit.newItem.key,
                    value: $scope.info.edit.newItem.value
                });

                delete $scope.info.edit.newItem.key;
                delete $scope.info.edit.newItem.value;
            };

            $scope.info.edit.removeItem = function(item, $event) {
                utils.stopEvent($event);

                _.remove($scope.info.edit.info.items, {
                    key: item.key,
                    value: item.value
                });
            };

            $scope.info.edit.updateInfo = function($event) {
                utils.stopEvent($event);
                if (!$scope.info.edit.info) {
                    return;
                }
                SecretService.updateInfo($scope.info.edit.info)
                    .success(function() {
                        events.emit('alert', {
                            type: 'success',
                            message: '信息修改成功'
                        });
                        refreshInfos(function(infos) {
                            $scope.info.currentInfo = _.find(infos, {
                                id: $scope.info.edit.info.id
                            });
                            $scope.info.toggleEdit(false);
                        });
                    })
                    .error(function(err) {
                        events.emit('alert', {
                            type: 'error',
                            message: err
                        });
                    });
            };

            $scope.info.copy = function(text) {
                if (!global.gui) {
                    return;
                }
                var clipboard = global.gui.Clipboard.get();
                clipboard.set(text, 'text');
                $scope.info.hintMsg = '已复制';
            };

            $scope.info.enableEditItem = function(item) {
                item.isEditing = true;
                item.editKey = item.key;
                item.editValue = item.value;
            };

            $scope.info.edit.cancelEditItem = function(item, $event) {
                utils.stopEvent($event);
                item.isEditing = false;
                item.editKey = item.key;
                item.editValue = item.value;
            };

            $scope.info.edit.editItem = function(item, $event) {
                utils.stopEvent($event);
                item.isEditing = false;
                item.key = item.editKey;
                item.value = item.editValue;
            };

            $scope.$on('tooltip.hide', function(e, org) {
                if (org.$id.indexOf('copy') > -1) {
                    $scope.$apply(function() {
                        $scope.info.hintMsg = '双击复制';
                    });
                }
            });

            $scope.$on('$destroy', function() {});

        };

        return ['$scope', 'events', 'SecretService', 'utils', '$timeout', 'key', InfoController];

    });


})(define, this);
