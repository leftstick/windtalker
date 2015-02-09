/**
 *
 *  The SignupController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([], function () {

        var SignupController = function ($scope, Db) {
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

            $scope.signup = function () {
                console.log({
                    name: $scope.user.name,
                    password: $scope.user.password,
                    question: $scope.user.question,
                    answer: $scope.user.answer
                });
                Db.addUser({
                        name: $scope.user.name,
                        password: $scope.user.password,
                        question: $scope.user.question,
                        answer: $scope.user.answer
                    })
                    .success(function () {
                        alert('注册成功');
                    });
            };

        };

        return ['$scope', 'Db', SignupController];

    });


})(define);