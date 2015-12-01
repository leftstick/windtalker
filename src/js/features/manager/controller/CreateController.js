/**
 *  Defines the CreateController controller
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
 *
 */
'use strict';

var noop = require('angular').noop;
var co = require('co');

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
        co(function*() {
            var info = yield ManagerService.addInfo({
                userId: user.id,
                name: $scope.secret.name,
                desc: $scope.secret.desc,
                items: $scope.items
            });
            events.emit('toast', {
                type: 'success',
                content: '新机密创建成功！',
                delay: 100
            });
            yield utils.delay(noop, 20);
            events.emit('bottomsheet-hide');
            yield utils.delay(noop, 550);
            events.emit('secrets-updated');
        })
            .catch(function(err) {
                events.emit('toast-error', err);
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
