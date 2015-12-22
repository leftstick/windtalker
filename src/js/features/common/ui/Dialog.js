/**
 *  Defines the Dialog
 *
 *  @author  Howard.Zuo
 *  @date    Dec 22, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var extend = require('angular').extend;

class Feature extends FeatureBase {
    constructor() {
        super('DialogModule');
    }

    beforeStart() {
    };

    dialogListener(events, $mdDialog) {
        var defaults = {
            template: '',
            onComplete: function() {}
        };

        events.on('dialog', function(data) {
            var opts = extend({}, defaults, data);
            $mdDialog.show({
                scope: opts.scope,
                targetEvent: opts.event,
                template: opts.template,
                onComplete: opts.onComplete
            });
        });
    }

    execute() {
        this.dialogListener.$inject = ['events', '$mdDialog'];
        this.run(this.dialogListener);
    }
}

module.exports = Feature;
