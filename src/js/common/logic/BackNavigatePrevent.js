/**
 *
 *  Defines BackNavigatePrevent service
 *
 *  @author  Howard.Zuo
 *  @date    Feb 11th, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular'], function(angular) {

        var modulename = 'BackNavigatePrevent';

        var module = angular.module(modulename, []);

        module.run(['$document', function($document) {

            $document.on('keydown', function(event) {

                var doPrevent = false;
                if (event.keyCode === 8) {
                    var d = event.srcElement || event.target;
                    if ((d.tagName.toUpperCase() === 'INPUT' &&
                            (
                                d.type.toUpperCase() === 'TEXT' ||
                                d.type.toUpperCase() === 'PASSWORD' ||
                                d.type.toUpperCase() === 'FILE' ||
                                d.type.toUpperCase() === 'EMAIL' ||
                                d.type.toUpperCase() === 'SEARCH' ||
                                d.type.toUpperCase() === 'DATE')
                        ) ||
                        d.tagName.toUpperCase() === 'TEXTAREA') {
                        doPrevent = d.readOnly || d.disabled;
                    } else {
                        doPrevent = true;
                    }
                }

                if (doPrevent) {
                    event.preventDefault();
                }

            });
        }]);

        return {
            name: modulename
        };

    });

}(define));
