/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';
var LoginController = function($scope, events, utils, AuthService) {

    $scope.user = {};

    var usersPromise = AuthService.getUsers();

    $scope.login = function() {
        usersPromise
            .success(function(data) {
                var founds = data.filter(function(user) {
                    return user.name === $scope.user.name && user.password === $scope.user.password;
                });
                if (founds.length) {
                    AuthService.currentUser(founds[0]);
                    utils.redirect('manager');
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
    'utils',
    'AuthService',
    LoginController
];
