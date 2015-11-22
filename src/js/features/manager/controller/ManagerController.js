/**
 *  Defines the ManagerController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var settingTpl = require('../partials/setting.html');

var ManagerController = function($scope, events, user, $location, ManagerService) {
    $scope.user = user;

    ManagerService.getInfos(user.id)
        .success(function(data) {
            $scope.secrets = data;
        });

    $scope.setting = function($event) {
        events.emit('bottomsheet', {
            event: $event,
            controller: 'SettingController',
            template: settingTpl
        });
    };

    $scope.logout = function($event) {
        events.emit('confirm', {
            content: '您确定要登出么？',
            event: $event,
            onComplete: function() {
                $location.url('url');
            }
        });
        return;
    };

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'user',
    '$location',
    'ManagerService',
    ManagerController
];
