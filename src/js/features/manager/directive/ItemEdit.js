/**
 *  Defines the ItemEdit Directive
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
            itemEdit: '=',
            onRemove: '&'
        },
        link: function($scope, element, attrs) {

            $scope.next = function($event) {
                if ($event.keyCode !== 13) {
                    return;
                }
                if (!$scope.itemEdit.key) {
                    return;
                }
                element.find('input')[1].focus();
            };

            $scope.finish = function($event) {
                if ($event.keyCode !== 13) {
                    return;
                }
                if (!$scope.itemEdit.key || !$scope.itemEdit.value) {
                    return;
                }
                $scope.disableValue();
            };

            $scope.editKey = function() {
                if ($scope.itemEdit.keyEditable) {
                    return;
                }
                $scope.itemEdit.keyEditable = true;
                element.find('i').removeClass('show');
            };

            $scope.editValue = function() {
                if ($scope.itemEdit.valueEditable) {
                    return;
                }
                $scope.itemEdit.valueEditable = true;
                element.find('i').removeClass('show');
            };

            $scope.disableKey = function() {
                $scope.itemEdit.keyEditable = false;
            };

            $scope.disableValue = function() {
                $scope.itemEdit.valueEditable = false;
            };

            element.on('mouseenter', function() {
                console.log($scope.itemEdit.keyEditable, $scope.itemEdit.valueEditable)
                if ($scope.itemEdit.keyEditable || $scope.itemEdit.valueEditable) {
                    return;
                }
                element.find('i').addClass('show');
            });

            element.on('mouseleave', function() {
                element.find('i').removeClass('show');
            });

            $scope.$on('$destroy', function() {
                element.off('mouseenter');
                element.off('mouseleave');
            });
        },
        template: '<md-input-container flex><label>项目名称</label><input ng-model="itemEdit.key" placeholder="如：用户名" ng-readonly="!itemEdit.keyEditable" ng-dblclick="editKey()" ng-blur="disableKey()" ng-keyup="next($event)"></md-input-container><md-input-container flex><label>项目内容</label><input ng-model="itemEdit.value" placeholder="如：密码" ng-readonly="!itemEdit.valueEditable" ng-dblclick="editValue()" ng-blur="disableValue()" ng-keyup="finish($event)"></md-input-container><i class="icon-cancel-circled remove-item" ng-click="onRemove()"></i>'
    };
};

module.exports = ['utils', ItemInput];
