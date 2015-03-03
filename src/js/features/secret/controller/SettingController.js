/**
 *
 *  The SettingController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 2th, 2015
 *
 **/
(function(define) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function() {

        var SettingController = function($scope, boot, events, auth, $location) {
            $scope.setting = {};

            $scope.setting.activeTab = 0;

            //DB management
            $scope.setting.dbLocation = boot.getDb();
            $scope.setting.dirty = false;
            $scope.setting.setDbLocation = function($hide) {
                $hide();
                boot.setDb($scope.setting.dbLocation);

                events.emit('modal', {
                    scope: $scope,
                    title: '提示',
                    backdrop: false,
                    content: '数据库位置更改后，需要重新登录！',
                    animation: 'am-fade-and-slide-top',
                    template: features + '/secret/partials/reLoginModal.html'
                });
            };

            $scope.setting.confirmRelogin = function($hide) {
                $hide();
                auth.logout();
                $location.url('login');
            };

            $scope.setting.showConfirmDbChangeModal = function() {
                events.emit('modal', {
                    scope: $scope,
                    title: '确认',
                    content: '确定要修改当前数据库位置么？',
                    animation: 'am-fade-and-slide-top',
                    template: features + '/secret/partials/confirmDbChangeModal.html'
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
