/**
 *  Defines the SignupController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';

var SignupController = function($scope, events, utils, StorageService) {

    $scope.$on('$destroy', function() {});
};

export default [
    '$scope',
    'events',
    'utils',
    'StorageService',
    SignupController
];
