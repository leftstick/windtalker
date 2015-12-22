/**
 *
 *  Defines MenuListener service
 *
 *  @author  Howard.Zuo
 *  @date    Dec 22, 2015
 *
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var NonManagerMenu = require('./NonManagerMenu');
var ManagerMenu = require('./ManagerMenu');

var remote = require('electron').remote;
var Menu = remote.Menu;
var MenuItem = remote.MenuItem;

class Feature extends FeatureBase {

    constructor() {
        super('MenuListenerModule');
    }

    listener($rootScope, $mdDialog, $mdBottomSheet, $mdSidenav) {
        $rootScope.$on('$routeChangeSuccess', function(e, route) {
            if (!route || !route.$$route || !route.$$route.id) {
                return;
            }
            if (route.$$route.id === 'manager') {
                window.closeOverlay = function() {
                    $mdDialog.cancel();
                    $mdBottomSheet.cancel();
                    $mdSidenav('left').close();
                };
                Menu.setApplicationMenu(Menu.buildFromTemplate(ManagerMenu));
                return;
            }
            var menus = NonManagerMenu.slice(0, NonManagerMenu.length);
            if (process.env.NODE_ENV !== 'dev') {
                menus = NonManagerMenu.slice(0, NonManagerMenu.length - 1);
            }
            Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
        });
    }

    execute() {
        this.listener.$inject = [
            '$rootScope',
            '$mdDialog',
            '$mdBottomSheet',
            '$mdSidenav'
        ];
        this.run(this.listener);
    }
}

module.exports = Feature;
