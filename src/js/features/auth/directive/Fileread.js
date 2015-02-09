/**
 *
 *  The Fileread.
 *
 *  @author  Howard.Zuo
 *  @date    Feb 8th, 2015
 *
 **/
(function (define) {
    'use strict';

    define(['jquery'], function ($) {

        var Fileread = function () {
            return {
                scope: {
                    fileread: '='
                },
                link: function ($scope, element) {

                    element.bind('change', function () {
                        var fullpath = $(this).val();
                        $scope.$apply(function () {
                            $scope.fileread = fullpath;
                        });
                    });
                }
            };
        };

        return [Fileread];

    });


})(define);