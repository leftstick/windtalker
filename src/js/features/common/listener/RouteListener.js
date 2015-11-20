/**
 *  Defines the RouteListener Module.
 *  This module used to emit events while route changed
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var mainWindow = require('electron').remote.getCurrentWindow();

class Feature extends FeatureBase {

    constructor() {
        super('RouteListenerModule');
    }

    execute() {
        this.run([
            '$rootScope',
            function($rootScope) {
                $rootScope.$on('$routeChangeSuccess', function(e, route) {
                    if (!route || !route.$$route || !route.$$route.size) {
                        return;
                    }
                    var size = route.$$route.size;
                    mainWindow.setContentSize(size.width, size.height);
                    mainWindow.setMinimumSize(size.minWidth || size.width, size.minHeight || size.height);
                    mainWindow.setResizable(!!size.resizable);
                });

            }
        ]);
    }
}

module.exports = Feature;
