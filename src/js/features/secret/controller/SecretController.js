/**
 *
 *  The SecretController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var SecretController = function($scope, $routeParams, $location, auth) {

            $scope.tab = $routeParams.tab;

            $scope.user = auth.currentUser();

            $scope.displaySidebar = false;

            $scope.toggleTab = function(tab) {
                $location.url('secret/' + tab);
            };

            $scope.toggleTab($scope.tab);

        };

        return ['$scope', '$routeParams', '$location', 'auth', SecretController];

    });


})(define);
