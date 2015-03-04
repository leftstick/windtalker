/**
 *
 *  The SignupController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 4th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var SignupController = function($scope, UserService, events, auth, $location) {
            $scope.user = {};
            $scope.valiate = {};
            $scope.questions = auth.questions();
            $scope.valiate.showHint = false;
            $scope.valiate.title = '';

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

            var check = function() {
                if (!$scope.user.password) {
                    $scope.valiate.title = '请先填写密码';
                    $scope.valiate.showHint = true;
                    return;
                }
                if ($scope.user.password !== $scope.user.repassword) {
                    $scope.valiate.title = '重复密码不一致';
                    $scope.valiate.showHint = true;
                    return;
                }
                $scope.valiate.showHint = false;
                $scope.valiate.title = '';
            };

            $scope.$watchGroup(['user.repassword', 'user.password'], check);

        };

        return ['$scope', 'UserService', 'events', 'auth', '$location', SignupController];

    });


})(define);
