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

        var LoginController = function($scope, Db, events, $location) {
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

                        $location.url('secret');

                    });
            };
        };

        return ['$scope', 'Db', 'events', '$location', LoginController];

    });


})(define);
