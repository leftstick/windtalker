/**
 *
 *  The DBSettingController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([], function () {

        var DBSettingController = function ($scope, $location, boot) {
            $scope.dbLocation = '';

            $scope.setDbLocation = function () {
                boot.setDb($scope.dbLocation);
                $location.url('login');
            };
        };

        return ['$scope', '$location', 'boot', DBSettingController];

    });

})(define);