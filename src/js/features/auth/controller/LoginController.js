/**
 *
 *  The LoginController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var LoginController = function($scope, Db, events, $location, auth) {
            $scope.user = {};
            $scope.login = function() {
                Db.getUsers()
                    .success(function(users) {
                        var found = _.find(users, {
                            name: $scope.user.name,
                            password: $scope.user.password
                        });
                        if (!found) {
                            events.emit('alert', {
                                type: 'warning',
                                message: '用户名或密码错误'
                            });
                            return;
                        }
                        auth.currentUser(found);
                        $location.url('secret/info');

                    });
            };
        };

        return ['$scope', 'Db', 'events', '$location', 'auth', LoginController];

    });


})(define);
