(function (define) {
    'use strict';

    define([], function () {

        var SignupController = function ($scope, $translate) {

            $scope.toggleLang = function (lang) {
                $translate.use(lang);
                $scope.curLang = lang;
            };

            $scope.regist = function () {

            };

            $scope.toggleLang($translate.use());
        };

        return ['$scope', '$translate', SignupController];

    });


})(define);