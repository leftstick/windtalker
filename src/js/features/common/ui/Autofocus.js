/**
 *  Defines the Autofocus Module.
 *  This module used to override the original `autofocus` attribute since it doesn't work properly with ngRoute
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('AutofocusModule');
    }

    execute() {
        this.directive('autofocus', function() {
            return {
                restrict: 'A',
                link: function($scope, element) {
                    element[0].focus();
                }
            };
        });
    }
}

module.exports = Feature;
