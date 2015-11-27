/**
 *
 *  Defines RouteIndicator service
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var pluck = require('lib/Pluck');
var angular = require('angular');
var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {

    constructor() {
        super('RouteIndicator');
        this.$body = angular.element(document.body);
    }

    execute() {
        var self = this;
        this.run([
            '$rootScope',
            'Routes',
            function($rootScope, Routes) {
                var classes = pluck(Routes, 'id').join(' ');
                $rootScope.$on('$routeChangeSuccess', function(e, route) {
                    self.$body.removeClass(classes);
                    if (route && route.$$route && route.$$route.id) {
                        self.$body.addClass(route.$$route.id);
                        self.$body.attr('id', route.$$route.id);
                    }
                });
            }
        ]);
    }
}

module.exports = Feature;
