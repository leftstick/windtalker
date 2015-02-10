/**
 *
 *  The stRatio.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 10th, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['jquery'], function($) {

        var stRatio = function() {
            return {
                link: function($scope, element, attr) {
                    var ratio = +(attr.stRatio);
                    element.css('width', ratio + '%');
                }
            };
        };

        return [stRatio];

    });


})(define);
