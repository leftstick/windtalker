/**
 *  Defines the ManagerController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
 *
 */
'use strict';

var debounce = require('lib/Debounce');
var settingTpl = require('../partials/setting.html');
var createTpl = require('../partials/create.html');
var merge = require('angular').merge;

var ipcRenderer = require('electron').ipcRenderer;

var ManagerController = function($scope, events, utils, ManagerService, AuthService) {
    $scope.secrets = [];
    $scope.loading = true;
    $scope.user = AuthService.currentUser();
    $scope.search = {txt: ''};
    $scope.info = {};
    $scope.state = {canSave: true};

    var commonErrorHandler = function(err) {
        events.emit('toast', {type: 'error', content: err});
    };

    var secretsUpdate = function() {
        utils.delay(function() {
            $scope.loading = true;
        }, 50)
            .then(function() {
                return ManagerService.getInfos($scope.user.id);
            })
            .then(function(data) {
                $scope.secrets = data;
                $scope.loading = false;
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
                }, 400);
            }
        });
        return;
    };

    $scope.deleteSecret = function(secret, $event) {
        events.emit('confirm', {
            content: '您确定要删除这个秘密么？',
            event: $event,
            onComplete: function() {
                ManagerService
                    .removeInfo(secret)
                    .success(function() {
                        events.emit('toast', {
                            type: 'success',
                            content: '秘密已删除！'
                        });
                        secretsUpdate();
                    })
                    .error(commonErrorHandler);
            }
        });
    };

    $scope.viewSecret = function(secret) {
        $scope.state.currentSecret = merge({}, secret);
        events.emit('sidebar', {id: 'left'});
    };

    $scope.removeItem = function(item) {
        $scope.state.currentSecret.items.splice($scope.state.currentSecret.items.indexOf(item), 1);
    };

    $scope.saveSecret = function() {
        ManagerService
            .updateInfo($scope.state.currentSecret)
            .success(function() {
                events.emit('toast', {
                    type: 'success',
                    content: '秘密已修改！'
                });
                events.emit('sidebar-hide', {id: 'left'});
                secretsUpdate();
            })
            .error(commonErrorHandler);
    };

    $scope.addItem = function() {
        $scope.state.currentSecret.items.push({
            key: $scope.info.key,
            value: $scope.info.value
        });
    };

    var updateSearchTxt = debounce(function(newValue) {
        $scope.search.searchTxt = newValue;
        $scope.$apply();
    }, 300);

    var searchWatch = $scope.$watch('search.txt', function(newValue) {
        updateSearchTxt(newValue);
    });

    var searchWatch = $scope.$watch('state.currentSecret.desc', function(newValue) {
        $scope.state.canSave = !!newValue;
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
