/**
 *  Defines the SignupController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var SignupController = function($scope, AuthService) {
    $scope.user = {};
    $scope.state = {notsame: false};

    AuthService.questions()
        .success(function(data) {
            $scope.questions = data;
        });

    var unwatch1 = $scope.$watch('user.repassword', function(newValue) {
        $scope.state.notsame = newValue !== $scope.user.password;
    });

    var unwatch2 = $scope.$watch('user.password', function(newValue) {
        $scope.state.notsame = newValue !== $scope.user.repassword;
    });

    $scope.saveUser = function() {
        console.log({
            name: $scope.user.username,
            password: $scope.user.password,
            question: $scope.user.question,
            answer: $scope.user.answer
        });
    };

    $scope.$on('$destroy', function() {
        unwatch1();
        unwatch2();
    });
};

module.exports = ['$scope', 'AuthService', SignupController];
