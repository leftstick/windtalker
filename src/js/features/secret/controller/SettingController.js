/**
 *
 *  The SettingController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 3th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var SettingController = function($scope, boot, events, auth, $location, UserService) {
            $scope.setting = {};

            $scope.setting.activeTab = 0;

            //DB management
            $scope.setting.dbLocation = boot.getDb();
            $scope.setting.dirty = false;

            $scope.setting.showConfirmDbChangeModal = function() {

                events.emit('confirm', {
                    content: '确定要修改当前数据库位置么？',
                    onConfirm: function() {

                        boot.setDb($scope.setting.dbLocation);

                        events.emit('info', {
                            content: '数据库位置更改后，需要重新登录！',
                            onClose: function() {
                                auth.logout();
                                $location.url('login');
                            }
                        });
                    }
                });
            };

            $scope.$watch('setting.dbLocation', function(newValue) {
                if (newValue && (newValue !== boot.getDb())) {
                    $scope.setting.dirty = true;
                } else {
                    $scope.setting.dirty = false;
                }
            });


            //password management
            $scope.setting.valiate = {};
            $scope.setting.valiate.showHint = false;
            $scope.setting.valiate.title = '';
            $scope.setting.showPwdUpdateConfirmModal = function(pwdForm) {
                events.emit('confirm', {
                    content: '确定要修改密码么？',
                    onConfirm: function() {

                        if ($scope.setting.oldPassword !== auth.currentUser().password) {
                            events.emit('alert', {
                                type: 'warning',
                                message: '旧密码错误！'
                            });
                            return;
                        }
                        var newUser = _.assign(auth.currentUser(), {
                            password: $scope.setting.newPassword
                        });

                        UserService.updateUser(newUser)
                            .success(function(user) {
                                auth.currentUser(user);
                                events.emit('alert', {
                                    type: 'success',
                                    message: '密码修改成功！'
                                });
                                pwdForm.$setPristine();
                                events.emit('info', {
                                    content: '密码修改后，需要重新登录！',
                                    onClose: function() {
                                        auth.logout();
                                        $location.url('login');
                                    }
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

            var check = function() {
                if (!$scope.setting.newPassword && !$scope.setting.renewPassword) {
                    $scope.setting.valiate.title = '';
                    $scope.setting.valiate.showHint = false;
                    return;
                }
                if (!$scope.setting.newPassword) {
                    $scope.setting.valiate.title = '请先填写新密码';
                    $scope.setting.valiate.showHint = true;
                    return;
                }
                if ($scope.setting.newPassword !== $scope.setting.renewPassword) {
                    $scope.setting.valiate.title = '重复密码不一致';
                    $scope.setting.valiate.showHint = true;
                    return;
                }
                $scope.setting.valiate.showHint = false;
                $scope.setting.valiate.title = '';
            };

            $scope.$watchGroup(['setting.newPassword', 'setting.renewPassword'], check);


            //QA management
            $scope.setting.questions = auth.questions();
            $scope.setting.selectedQuestion = auth.currentUser().question;
            $scope.setting.answer = auth.currentUser().answer;
            $scope.setting.showHintChangeConfirmModal = function(hintForm) {
                events.emit('confirm', {
                    content: '确定要修改密码提示信息么？',
                    onConfirm: function() {
                        var newUser = _.assign(auth.currentUser(), {
                            question: $scope.setting.selectedQuestion,
                            answer: $scope.setting.answer
                        });
                        UserService.updateUser(newUser)
                            .success(function(user) {
                                auth.currentUser(user);
                                events.emit('alert', {
                                    type: 'success',
                                    message: '修改密码提示信息成功！'
                                });
                                hintForm.$setPristine();
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

        };

        return ['$scope', 'boot', 'events', 'auth', '$location', 'UserService', SettingController];

    });


})(define);
