/**
 *  Defines the SettingController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 22, 2015
 *
 */
'use strict';

var SettingController = function($scope, events, AuthService) {

    AuthService.questions()
        .success(function(data) {
            $scope.questions = data;
        });

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'AuthService',
    SettingController
];
