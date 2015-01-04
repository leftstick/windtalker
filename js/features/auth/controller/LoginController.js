(function (define) {
    'use strict';

    define([], function () {

        var LoginController = function ($scope, $translate, $timeout) {
            $scope.loginInfo = {};

            $scope.toggleLang = function (lang) {
                $translate.use(lang);
                $scope.curLang = lang;
            };

            $scope.login = function () {
                $scope.loginInfo.errorMsg = 'LOGIN_ERROR';
                $timeout(function () {
                    delete $scope.loginInfo.errorMsg;
                }, 5000);
            };

            $scope.toggleLang($translate.use());
        };

        return ['$scope', '$translate', '$timeout', LoginController];

    });


})(define);