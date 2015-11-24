/**
 *  Defines the ManagerController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';

var debounce = require('lib/Debounce');
var settingTpl = require('../partials/setting.html');

var ManagerController = function($scope, events, $location, ManagerService, AuthService) {
    $scope.user = AuthService.currentUser();
    $scope.search = {txt: ''};

    $scope.loading = true;

    ManagerService.getInfos($scope.user.id)
        .success(function(data) {
            $scope.secrets = data;
            $scope.loading = false;
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

    var updateSearchTxt = debounce(function(newValue) {
        $scope.search.searchTxt = newValue;
        $scope.$apply();
    }, 300);

    var searchWatch = $scope.$watch('search.txt', function(newValue) {
        updateSearchTxt(newValue);
    });

    $scope.$on('$destroy', function() {
        updateSearchTxt();
    });
};

module.exports = [
    '$scope',
    'events',
    '$location',
    'ManagerService',
    'AuthService',
    ManagerController
];
