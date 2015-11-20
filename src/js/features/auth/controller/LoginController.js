/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var LoginController = function($scope, events, $location, AuthService) {

    $scope.user = {};

    var usersPromise = AuthService.getUsers();

    $scope.login = function() {
        usersPromise
            .success(function(data) {
                var founds = data.filter(function(user) {
                    return user.name === $scope.user.name && user.password === $scope.user.password;
                });
                if (founds.length) {
                    $location.url('manager/' + founds[0].id);
                    return;
                }
                events.emit('toast', {
                    type: 'error',
                    content: '用户名或密码输入错误'
                });
            });
    };

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    '$location',
    'AuthService',
    LoginController
];
