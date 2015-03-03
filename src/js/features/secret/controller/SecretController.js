/**
 *
 *  The SecretController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 3th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var SecretController = function($scope, $routeParams, $location, auth, events) {

            $scope.tab = $routeParams.tab;

            $scope.user = auth.currentUser();

            $scope.displaySidebar = false;

            $scope.toggleTab = function(tab) {
                $location.url('secret/' + tab);
            };

            $scope.logout = function() {
                events.emit('confirm', {
                    content: '确定要登出该用户么？',
                    onConfirm: function() {
                        auth.logout();
                        $location.url('login');
                    }
                });
            };

            $scope.toggleTab($scope.tab);

        };

        return ['$scope', '$routeParams', '$location', 'auth', 'events', SecretController];

    });


})(define);
