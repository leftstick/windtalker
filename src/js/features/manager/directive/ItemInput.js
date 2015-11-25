/**
 *  Defines the ItemInput Directive
 *
 *  @author  Howard.Zuo
 *  @date    Nov 25, 2015
 *
 */
'use strict';

var ItemInput = function(utils) {
    return {
        restrict: 'A',
        scope: {
            itemInput: '=',
            onSubmit: '&'
        },
        link: function($scope, element, attrs) {

            $scope.next = function($event) {
                if ($event.keyCode !== 13) {
                    return;
                }
                if (!$scope.itemInput.key) {
                    return;
                }
                element.find('input')[1].focus();
            };

            $scope.finish = function($event) {
                if ($event.keyCode !== 13) {
                    return;
                }
                if (!$scope.itemInput.key || !$scope.itemInput.value) {
                    return;
                }
                $scope.onSubmit();
                utils.delay(function() {
                    $scope.itemInput.key = '';
                    $scope.itemInput.value = '';
                    element.find('input')[0].focus();
                }, 10);
            };
        },
        template: '<md-input-container flex><label>项目名称</label><input ng-keyup="next($event)" ng-model="itemInput.key" placeholder="如：用户名"></md-input-container><md-input-container flex><label>项目内容</label><input ng-model="itemInput.value" placeholder="如：密码" ng-keyup="finish($event)"></md-input-container>'
    };
};

module.exports = ['utils', ItemInput];
