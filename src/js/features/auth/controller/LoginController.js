/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';
var LoginController = function($scope, events, utils, AuthService, $interval, $timeout) {

    $scope.state = {shake: ''};

    $scope.user = {};

    var shakePromise = $interval(function() {
        $scope.state.shake = 'bounce';
        $timeout(function() {
            $scope.state.shake = '';
        }, 1000);
    }, 5000);

    $scope.$on('$destroy', function() {
        $interval.cancel(shakePromise);
    });
};

export default [
    '$scope',
    'events',
    'utils',
    'AuthService',
    '$interval',
    '$timeout',
    LoginController
];
