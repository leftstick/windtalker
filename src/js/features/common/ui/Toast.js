/**
 *  Defines the Toast
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var {merge} = require('angular');

class Feature extends FeatureBase {
    constructor() {
        super('ToastModule');
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
            '$mdToast',
            function(events, $mdToast) {

                events.on('toast', function(data) {
                    var opts = merge({}, defaults, data);
                    $mdToast.show({
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
