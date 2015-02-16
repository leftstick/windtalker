/**
 *
 *  The SecretController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 16th, 2015
 *
 **/
(function(define) {
    'use strict';

    var features = requirejs.toUrl('features');

    define([], function() {

        var SecretController = function($scope, $routeParams, $location, auth, events) {

            $scope.tab = $routeParams.tab;

            $scope.user = auth.currentUser();

            $scope.displaySidebar = false;

            $scope.toggleTab = function(tab) {
                $location.url('secret/' + tab);
            };

            $scope.logout = function() {
                events.emit('modal', {
                    scope: $scope,
                    title: '确认',
                    content: '确定要登出该用户么？',
                    animation: 'am-fade-and-slide-top',
                    template: features + '/secret/partials/confirmLogoutModal.html'
                });
            };

            $scope.confirmLogout = function($hide) {
                auth.logout();
                $location.url('login');
                $hide();
            };

            $scope.toggleTab($scope.tab);

        };

        return ['$scope', '$routeParams', '$location', 'auth', 'events', SecretController];

    });


})(define);
