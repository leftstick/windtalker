/**
 *
 *  The SignupController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 3th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var SignupController = function($scope, UserService, events, auth, $location) {
            $scope.user = {};
            $scope.questions = auth.questions();

            $scope.signup = function() {
                UserService.addUser({
                        name: $scope.user.name,
                        password: $scope.user.password,
                        question: $scope.user.question,
                        answer: $scope.user.answer
                    })
                    .success(function(user) {
                        events.emit('alert', {
                            type: 'success',
                            message: '注册成功'
                        });
                        auth.currentUser(user);
                        $location.url('secret/info');
                    })
                    .error(function(err) {
                        events.emit('alert', {
                            type: 'error',
                            message: err
                        });
                    });
            };

        };

        return ['$scope', 'UserService', 'events', 'auth', '$location', SignupController];

    });


})(define);
