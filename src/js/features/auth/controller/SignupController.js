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
            $scope.questions = [{
                'label': '父亲的名字',
                'value': 'FATHER_NAME'
            }, {
                'label': '母亲的名字',
                'value': 'MOTHER_NAME'
            }, {
                'label': '小学的名字',
                'value': 'PRIMARY_SCHOOL_NAME'
            }, {
                'label': '第一只宠物的名字',
                'value': 'FIRST_PET_NAME'
            }];

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
