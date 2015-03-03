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

    define([], function() {

        var SettingController = function($scope, boot, events, auth, $location) {
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


            //QA management
            $scope.setting.questions = auth.questions();


        };

        return ['$scope', 'boot', 'events', 'auth', '$location', SettingController];

    });


})(define);
