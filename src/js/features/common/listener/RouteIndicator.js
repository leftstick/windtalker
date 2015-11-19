/**
 *
 *  Defines RouteIndicator service
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
import pluck from 'lib/Pluck';
import angular from 'angular';
import FeatureBase from 'lib/FeatureBase';

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
                    }
                });
            }
        ]);
    }
}

export default Feature;
