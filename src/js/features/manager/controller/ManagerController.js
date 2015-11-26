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
var createTpl = require('../partials/create.html');

var ManagerController = function($scope, events, utils, ManagerService, AuthService) {
    $scope.user = AuthService.currentUser();
    $scope.search = {txt: ''};

    var secretsUpdate = function() {
        utils.delay(function() {
            $scope.secrets = [];
        })
            .then(function() {
                return utils.delay(function() {
                    $scope.loading = true;
                });
            })
            .then(function() {
                return ManagerService.getInfos($scope.user.id);
            })
            .then(function(data) {
                utils.delay(function() {
                    $scope.secrets = data;
                    $scope.loading = false;
                });
            });
    };

    secretsUpdate();

    $scope.create = function($event) {
        events.emit('bottomsheet', {
            event: $event,
            controller: 'CreateController',
            template: createTpl
        });
    };

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
                utils.delay(function() {
                    utils.redirect('/login');
                }, 100);
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

    events.on('secrets-updated', secretsUpdate);

    $scope.$on('$destroy', function() {
        updateSearchTxt();
        events.off('secrets-updated', secretsUpdate);
    });
};

module.exports = [
    '$scope',
    'events',
    'utils',
    'ManagerService',
    'AuthService',
    ManagerController
];
