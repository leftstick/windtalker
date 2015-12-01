/**
 *  Defines the Autofocus Module.
 *  This module used to override the original `autofocus` attribute since it doesn't work properly with ngRoute
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('AutofocusModule');
    }

    autofocus() {
        return {
            restrict: 'A',
            link: function($scope, element) {
                element[0].focus();
            }
        };
    }

    execute() {
        this.directive('autofocus', this.autofocus);
    }
}

module.exports = Feature;
