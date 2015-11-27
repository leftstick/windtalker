/**
 *  Defines the RouteListener Module.
 *  This module used to emit events while route changed
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
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
            'Routes',
            '$document',
            function($rootScope, Routes, $document) {
                $rootScope.$on('$viewContentLoaded', function() {
                    var route = Routes.filter(function(route) {
                        return route.id === $document[0].body.id;
                    })[0];
                    if (!route.size) {
                        return;
                    }
                    var size = route.size;
                    mainWindow.setContentSize(size.width, size.height);
                    mainWindow.setMinimumSize(size.minWidth || size.width, size.minHeight || size.height);
                    mainWindow.setResizable(!!size.resizable);
                });
            }
        ]);
    }
}

module.exports = Feature;
