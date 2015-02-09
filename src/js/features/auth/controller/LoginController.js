/**
 *
 *  The LoginController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var LoginController = function($scope, Db, events) {
            $scope.user = {};
            $scope.login = function() {
                Db.getUsers()
                    .success(function(users) {
                        var verify = _.any(users, {
                            name: $scope.user.name,
                            password: $scope.user.password
                        });
                        if (!verify) {
                            events.emit('alert', {
                                type: 'warning',
                                message: '用户名或密码错误'
                            });
                            return;
                        }
                        events.emit('alert', {
                            type: 'success',
                            message: '登录成功'
                        });
                    });
            };

            $scope.closeError = function() {
                delete $scope.user.error;
            };
        };

        return ['$scope', 'Db', 'events', LoginController];

    });


})(define);
