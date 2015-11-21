/**
 *  Defines the Dialog
 *
 *  @author  Howard.Zuo
 *  @date    Nov 21, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');

class Feature extends FeatureBase {
    constructor() {
        super('DialogModule');
    }

    beforeStart() {};

    execute() {

        var defaults = {
            content: '',
            position: 'top right',
            delay: 3000,
            type: 'info'
        };

        this.run([
            'events',
            '$mdDialog',
            function(events, $mdDialog) {

                events.on('dialog', function(data) {
                    var opts = merge({}, defaults, data);
                    $mdDialog.show({
                        template: '<md-toast class="md-toast ' + opts.type + '">' + opts.content + '</md-toast>',
                        hideDelay: opts.delay,
                        position: opts.position
                    });
                });
            }
        ]);
    }
}

module.exports = Feature;
