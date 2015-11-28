/**
 *  Defines the Toast
 *
 *  @author  Howard.Zuo
 *  @date    Nov 28, 2015
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

        var defaultDelay = {
            info: 2000,
            error: 3000,
            success: 700,
            warning: 1500
        };

        var defaults = {
            content: '',
            position: 'top right',
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
                        hideDelay: data.delay || defaultDelay[opts.type],
                        position: opts.position
                    });
                });
            }
        ]);
    }
}

module.exports = Feature;
