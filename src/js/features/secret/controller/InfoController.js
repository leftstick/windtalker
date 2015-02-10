/**
 *
 *  The InfoController.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define([], function() {

        var InfoController = function($scope) {

            $scope.infos = [{
                name: 'http://www.baidu.com',
                desc: '百度的小玩意'
            }];

        };

        return ['$scope', InfoController];

    });


})(define);
