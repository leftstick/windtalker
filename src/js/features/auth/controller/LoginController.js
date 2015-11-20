/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var LoginController = function($scope, events, utils, AuthService) {

    $scope.user = {};

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'utils',
    'AuthService',
    LoginController
];
