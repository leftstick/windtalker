(function (define) {
    'use strict';

    define([], function () {

        var ForgetController = function ($scope, $translate) {

            $scope.forgetInfo = {};

            $scope.toggleLang = function (lang) {
                $translate.use(lang);
                $scope.curLang = lang;
            };

            $scope.getPassword = function () {
                $scope.forgetInfo.password = 'sdf';
            };

            $scope.toggleLang($translate.use());
        };

        return ['$scope', '$translate', ForgetController];

    });


})(define);