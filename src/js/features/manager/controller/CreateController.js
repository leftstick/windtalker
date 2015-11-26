/**
 *  Defines the CreateController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 25, 2015
 *
 */
'use strict';

var noop = require('angular').noop;

var CreateController = function($scope, events, ManagerService, AuthService, utils) {
    var user = AuthService.currentUser();
    $scope.state = {canAdd: false};

    $scope.secret = {};
    $scope.info = {};
    $scope.items = [];

    $scope.addItem = function() {
        $scope.items.push({
            key: $scope.info.key,
            value: $scope.info.value
        });
    };

    $scope.removeItem = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.addSecret = function() {
        ManagerService.addInfo({
            userId: user.id,
            name: $scope.secret.name,
            desc: $scope.secret.desc,
            items: $scope.items
        })
            .success(function() {
                events.emit('toast', {
                    type: 'success',
                    content: '新机密创建成功！',
                    delay: 100
                });
                utils.delay(function() {
                    events.emit('bottomsheet-hide');
                }, 20)
                    .then(function() {
                        return utils.delay(noop, 550);
                    })
                    .then(function() {
                        events.emit('secrets-updated');
                    });
            })
            .error(function(err) {
                events.emit('toast', {
                    type: 'error',
                    content: err
                });
            });
    };

    var nameWatcher = $scope.$watch('secret.name', function(newValue) {
        $scope.state.canAdd = newValue && $scope.secret.desc;
    });

    var descWatcher = $scope.$watch('secret.desc', function(newValue) {
        $scope.state.canAdd = newValue && $scope.secret.name;
    });

    $scope.$on('$destroy', function() {
        nameWatcher();
        descWatcher();
    });
};

module.exports = [
    '$scope',
    'events',
    'ManagerService',
    'AuthService',
    'utils',
    CreateController
];
