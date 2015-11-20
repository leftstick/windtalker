/**
 *  Defines the ForgetController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var debounce = require('lib/Debounce');

var ForgetController = function($scope, AuthService) {
    $scope.user = {};
    $scope.state = {incorrectusername: false};

    AuthService.questions()
        .success(function(data) {
            $scope.questions = data;
        });

    var checkUsername = debounce(function(username) {
        //
    }, 300);

    var unwatch = $scope.$watch('user.username', function(newValue) {
        checkUsername(newValue);
    });

    $scope.$on('$destroy', function() {
        unwatch();
    });
};

module.exports = ['$scope', 'AuthService', ForgetController];
