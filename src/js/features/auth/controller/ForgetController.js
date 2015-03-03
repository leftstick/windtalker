/**
 *
 *  The ForgetController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 3th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['lodash'], function(_) {

        var ForgetController = function($scope, auth, UserService, events) {

            $scope.user = {};

            $scope.forget = function() {
                UserService.getUserByName($scope.user.name)
                    .success(function(user) {
                        if (user.answer === $scope.user.answer) {
                            $scope.user.password = user.password;
                            return;
                        }
                        delete $scope.user.password;
                        events.emit('alert', {
                            type: 'warning',
                            message: '密码提示问题回答错误'
                        });
                    });
            };

            $scope.$watch('user.name', _.debounce(function(newValue) {
                if (!newValue) {
                    delete $scope.user.question;
                    return;
                }

                UserService.getUserByName(newValue)
                    .success(function(user) {
                        if (user) {
                            $scope.user.question = _.find(auth.questions(), {
                                value: user.question
                            }).label;
                            return;
                        }
                        delete $scope.user.question;
                    });

            }, 200));

        };

        return ['$scope', 'auth', 'UserService', 'events', ForgetController];

    });


})(define);
