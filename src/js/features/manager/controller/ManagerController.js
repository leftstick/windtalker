/**
 *  Defines the ManagerController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var settingTpl = require('../partials/setting.html');

var ManagerController = function($routeParams, $scope, events, user, $location, ManagerService, AuthService) {
    $scope.user = user;

    ManagerService.getInfos(user.id)
        .success(function(data) {
            $scope.secrets = data;
        });

    $scope.setting = function($event) {
        events.emit('bottomsheet', {
            event: $event,
            controller: 'SettingController',
            resolve: {
                user: function() {
                    return AuthService.getUserById($routeParams.userId);
                }

            },
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
    '$routeParams',
    '$scope',
    'events',
    'user',
    '$location',
    'ManagerService',
    'AuthService',
    ManagerController
];
