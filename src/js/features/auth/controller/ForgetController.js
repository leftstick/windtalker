/**
 *
 *  The ForgetController.
 *
 *  @author  Howard.Zuo
 *  @date    Mar 3th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var ForgetController = function($scope, auth) {

            $scope.selectedQuestion = '';
            $scope.questions = auth.questions();

        };

        return ['$scope', 'auth', ForgetController];

    });


})(define);
