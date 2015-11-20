/**
 *  Defines the ShakeIcon directive
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var ShakeIcon = function($timeout) {

    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {

            var promise1, promise2;

            var repeat = function() {
                promise1 = $timeout(function() {
                    element.addClass('bounce');
                    promise2 = $timeout(function() {
                        element.removeClass('bounce');
                        repeat();
                    }, 1000);
                }, 5000);
            };

            repeat();

            scope.$on('$destroy', function() {
                $timeout.cancel(promise1);
                $timeout.cancel(promise2);
            });
        }
    };
};

module.exports = ['$timeout', ShakeIcon];
