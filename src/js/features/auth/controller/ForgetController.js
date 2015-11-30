/**
 *  Defines the ForgetController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 30, 2015
 *
 */
'use strict';

var debounce = require('lib/Debounce');
var clipboard = require('electron').clipboard;
var co = require('co');

var ForgetController = function($scope, AuthService, DbService, $q, events) {
    $scope.hasDbSet = DbService.checkDbAddress();
    $scope.user = {};
    $scope.state = {incorrectusername: false};

    $scope.getPassword = function() {
        co(function*() {
            var user = yield AuthService.getUserByName($scope.user.name);
            if (user.answer === $scope.user.answer) {
                events.emit('toast-info', '密码已保存至剪贴板，按"Ctrl + v"即可粘贴');
                clipboard.writeText(user.password);
                return;
            }
            events.emit('toast-warning', '密码提示答案输入错误');
        })
            .catch(function(err) {
                events.emit('toast-warning', err);
            });

    };

    var checkUsername = debounce(function(username) {

        co(function*() {
            var data = yield AuthService.getUsers();
            var users = data.filter(function(user) {
                return user.name === username;
            });

            if (!users.length) {
                $scope.user.question = '';
                $scope.state.incorrectusername = true;
                $scope.$apply();
                return;
            }

            var questions = yield AuthService.questions();
            $scope.user.question = questions.filter(function(qu) {
                return qu.value === users[0].question;
            })[0].label;
            $scope.state.incorrectusername = false;
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
