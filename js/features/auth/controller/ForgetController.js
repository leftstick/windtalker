/**
 *
 *  The ForgetController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define([], function () {

        var ForgetController = function ($scope) {

            $scope.selectedQuestion = '';
            $scope.questions = [{
                'label': '父亲的名字',
                'value': 'FATHER_NAME'
            }, {
                'label': '母亲的名字',
                'value': 'MOTHER_NAME'
            }, {
                'label': '小学的名字',
                'value': 'PRIMARY_SCHOOL_NAME'
            }, {
                'label': '第一只宠物的名字',
                'value': 'FIRST_PET_NAME'
            }];

        };

        return ['$scope', ForgetController];

    });


})(define);