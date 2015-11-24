/**
 *  Defines the CreateController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 */
'use strict';

var CreateController = function($scope, events, AuthService, DbService, utils) {
    var user = AuthService.currentUser();


    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'AuthService',
    'DbService',
    'utils',
    CreateController
];
