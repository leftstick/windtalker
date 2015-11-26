/**
 *  Defines the Sidebar
 *
 *  @author  Howard.Zuo
 *  @date    Nov 26, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {
    constructor() {
        super('SidebarModule');
    }

    beforeStart() {};

    execute() {

        this.run([
            'events',
            '$mdSidenav',
            function(events, $mdSidenav) {

                events.on('sidebar', function(data) {
                    $mdSidenav(data.id).open();
                });

                events.on('sidebar-hide', function(data) {
                    $mdSidenav(data.id).close();
                });
            }
        ]);
    }
}

module.exports = Feature;
