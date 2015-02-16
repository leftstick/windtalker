/**
 *
 *  The onOutClick.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 16th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var onOutClick = function($document) {
            return {
                restrict: 'A',
                scope: {
                    onOutClick: '&'
                },
                link: function($scope, element) {

                    var outClick = function(e) {
                        if (angular.element(e.target).closest(element).length === 0) {
                            $scope.$apply(function() {
                                $scope.onOutClick();
                            });
                        }
                    };

                    $document.on('click', outClick);

                    $scope.$on('$destroy', function() {
                        $document.off('click', outClick);
                    });
                }
            };
        };

        return ['$document', onOutClick];

    });


})(define);
