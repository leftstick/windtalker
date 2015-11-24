/**
 *  Defines the SettingController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 23, 2015
 *
 */
'use strict';

var mainWindow = require('electron').remote.getCurrentWindow();
var dialog = require('electron').remote.require('dialog');

var merge = require('angular').merge;
var debounce = require('lib/Debounce');
var fs = require('fs');

var SettingController = function($scope, events, AuthService, DbService, utils) {
    var user = AuthService.currentUser();
    $scope.user = {question: user.question};
    $scope.db = {address: DbService.address()};
    $scope.passwordstate = {oldpasswordIncorrect: false};
    $scope.dbstate = {invalidAddress: false};

    var updateUser = function(newUser, message, needlogout) {
        AuthService.updateUser(newUser)
            .success(function() {
                AuthService.currentUser(newUser);
                events.emit('info', {
                    content: message,
                    onComplete: function() {
                        events.emit('bottomsheet-hide');
                        if (needlogout) {
                            utils.delay(function() {
                                utils.redirect('login');
                            }, 600);
                        }
                    }
                });
            })
            .error(function() {
                events.emit('toast', {
                    type: 'error',
                    content: '密码重置失败，请联系作者'
                });
            });
    };

    $scope.updatePassword = function(form) {
        var newUser = merge({}, user);
        newUser.password = $scope.user.password;
        updateUser(newUser, '密码重置成功，需重新登录', true);
    };

    $scope.saveNewQuestion = function() {
        var newUser = merge({}, user);
        newUser.question = $scope.user.question;
        newUser.answer = $scope.user.answer;
        $scope.user = {question: newUser.answer};
        updateUser(newUser, '提示问题重置成功');
    };

    $scope.updatedb = function() {
        DbService.address($scope.db.address);
        events.emit('info', {
            content: '数据库目录锁定成功，需重新登录',
            onComplete: function() {
                events.emit('bottomsheet-hide');
                utils.delay(function() {
                    utils.redirect('login');
                }, 600);
            }
        });
    };

    $scope.openDialog = function($event) {
        utils.stopEvent($event);
        dialog.showOpenDialog(mainWindow, {
            title: '位置选择',
            properties: [
                'openDirectory'
            ]
        }, function(files) {
            if (files && files.length) {
                $scope.db.address = files[0];
                $scope.$apply();
            }
        });
    };

    AuthService.questions()
        .success(function(data) {
            $scope.questions = data;
        });

    var reEnvaluePasswordForm = function() {
        $scope.passwordstate.isInvalid = $scope.passwordstate.oldpasswordIncorrect || $scope.passwordstate.repasswordnotsame;
    };

    var oldpasswordWatch = $scope.$watch('user.oldpassword', function(newValue) {
        if (!newValue) {
            return;
        }
        $scope.passwordstate.oldpasswordIncorrect = user.password !== newValue;
        reEnvaluePasswordForm();
    });
    var repasswordWatch = $scope.$watch('user.repassword', function(newValue) {
        $scope.passwordstate.repasswordnotsame = $scope.user.password !== newValue;
        reEnvaluePasswordForm();
    });
    var passwordWatch = $scope.$watch('user.password', function(newValue) {
        $scope.passwordstate.repasswordnotsame = $scope.user.repassword !== newValue;
        reEnvaluePasswordForm();
    });

    var checkAddress = debounce(function(value) {
        var stat;
        try {
            stat = fs.statSync(value);
            $scope.dbstate.invalidAddress = !stat.isDirectory();
        } catch (e) {
            $scope.dbstate.invalidAddress = true;
        }
        $scope.$apply();
    }, 300);

    var undbwatch = $scope.$watch('db.address', function(newValue) {
        if (!newValue) {
            return;
        }
        checkAddress(newValue);
    });


    $scope.$on('$destroy', function() {
        oldpasswordWatch();
        repasswordWatch();
        passwordWatch();
        undbwatch();
    });
};

module.exports = [
    '$scope',
    'events',
    'AuthService',
    'DbService',
    'utils',
    SettingController
];
