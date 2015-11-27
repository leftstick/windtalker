/**
 *  Defines the LoginController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
 *
 */
'use strict';
var LoginController = function($scope, events, utils, AuthService, DbService) {
    $scope.hasDbSet = DbService.checkDbAddress();
    $scope.user = {};

    var usersPromise = AuthService.getUsers();

    var errorHandler = function(type) {
        return function(msg) {
            events.emit('toast', {type: type, content: msg});
        };

    };

    $scope.login = function() {
        usersPromise
            .success(function(data) {

                var founds = data.filter(function(user) {
                    return user.name === $scope.user.name && user.password === $scope.user.password;
                });
                if (founds.length) {
                    AuthService.currentUser(founds[0]);
                    utils.redirect('/manager');
                    return;
                }
                errorHandler('error')('用户名或密码输入错误');
            })
            .error(errorHandler('warn'));
    };

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'utils',
    'AuthService',
    'DbService',
    LoginController
];
