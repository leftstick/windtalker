/**
 *  Defines the CreateController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 25, 2015
 *
 */
'use strict';

var CreateController = function($scope, events, AuthService, utils) {
    $scope.info = {};
    $scope.items = [];

    $scope.addItem = function() {
        $scope.items.push({
            key: $scope.info.key,
            value: $scope.info.value
        });
    };


    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'AuthService',
    'utils',
    CreateController
];
