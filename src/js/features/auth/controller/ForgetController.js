/**
 *  Defines the ForgetController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var debounce = require('lib/Debounce');
var clipboard = require('electron').clipboard;

var ForgetController = function($scope, AuthService, DbService, $q, events) {
    $scope.hasDbSet = DbService.checkDbAddress();
    $scope.user = {};
    $scope.state = {incorrectusername: false};

    var usersPromise = AuthService.getUsers();

    $scope.getPassword = function() {
        AuthService.getUserByName($scope.user.name)
            .success(function(data) {
                if (data.answer === $scope.user.answer) {
                    events.emit('toast', {
                        content: '密码已保存至剪贴板，按"Ctrl + v"即可粘贴'
                    });
                    clipboard.writeText(data.password);
                    return;
                }
                events.emit('toast', {
                    type: 'warning',
                    content: '密码提示答案输入错误'
                });
            })
            .error(function(err) {
                events.emit('toast', {
                    type: 'warning',
                    content: err
                });
            });
    };

    var checkUsername = debounce(function(username) {

        usersPromise
            .then(function(data) {
                return data.filter(function(user) {
                    return user.name === username;
                });
            })
            .then(function(users) {
                if (!users.length) {
                    return $q.reject();
                }
                return $q.all([users, AuthService.questions()]);
            })
            .then(function(data) {
                var users = data[0];
                var qus = data[1];
                $scope.user.question = qus.filter(function(qu) {
                    return qu.value === users[0].question;
                })[0].label;
                $scope.state.incorrectusername = false;
            })
            .catch(function() {
                $scope.user.question = '';
                $scope.state.incorrectusername = true;
            });
    }, 300);

    var unwatch = $scope.$watch('user.name', function(newValue) {
        checkUsername(newValue);
    });

    $scope.$on('$destroy', function() {
        unwatch();
    });
};

module.exports = [
    '$scope',
    'AuthService',
    'DbService',
    '$q',
    'events',
    ForgetController
];
