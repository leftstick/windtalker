/**
 *  Defines the Sidebar
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {
    constructor() {
        super('SidebarModule');
    }

    beforeStart() {};

    sidebarListener(events, $mdSidenav) {
        events.on('sidebar', function(data) {
            $mdSidenav(data.id).open();
        });

        events.on('sidebar-hide', function(data) {
            $mdSidenav(data.id).close();
        });
    }

    execute() {
        this.sidebarListener.$inject = ['events', '$mdSidenav'];
        this.run(this.sidebarListener);
    }
}

module.exports = Feature;
