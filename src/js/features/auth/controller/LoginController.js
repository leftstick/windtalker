/**
 *
 *  The LoginController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define(['lodash'], function (_) {

        var LoginController = function ($scope, Db) {
            $scope.user = {};
            $scope.size = {
                width: 430,
                height: 315
            };

            $scope.login = function () {
                Db.getUsers()
                    .success(function (users) {
                        var verify = _.any(users, {
                            name: $scope.user.name,
                            password: $scope.user.password
                        });
                        if (!verify) {
                            $scope.user.error = '用户名或密码不正确，请重试';
                            return;
                        }
                        delete $scope.user.error;
                        alert('登录成功!');
                    });
            };

            $scope.closeError = function () {
                delete $scope.user.error;
            };
        };

        return ['$scope', 'Db', LoginController];

    });


})(define);