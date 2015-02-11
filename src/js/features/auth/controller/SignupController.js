/**
 *
 *  The SignupController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 9th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var SignupController = function($scope, UserService, events) {
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
                    .success(function() {
                        events.emit('alert', {
                            type: 'success',
                            message: '注册成功'
                        });
                    })
                    .error(function(err) {
                        events.emit('alert', {
                            type: 'error',
                            message: err
                        });
                    });
            };

        };

        return ['$scope', 'UserService', 'events', SignupController];

    });


})(define);
