/**
 *  Defines the Toast
 *
 *  @author  Howard.Zuo
 *  @date    Dec 22, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var {extend} = require('angular');

class Feature extends FeatureBase {
    constructor() {
        super('ToastModule');
    }

    beforeStart() {
    };

    toastListener(events, $mdToast) {
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

        events.on('toast', function(data) {
            var opts = extend({}, defaults, data);
            $mdToast.show({
                template: '<md-toast md-theme="default" class="' + opts.type + '"><div class="md-toast-content"><span flex>' + opts.content + '</span></div></md-toast>',
                hideDelay: data.delay || defaultDelay[opts.type],
                position: opts.position
            });
        });

        events.on('toast-warning', function(content) {
            events.emit('toast', {
                type: 'warning',
                content: content
            });
        });

        events.on('toast-error', function(content) {
            events.emit('toast', {
                type: 'error',
                content: content
            });
        });

        events.on('toast-success', function(content) {
            events.emit('toast', {
                type: 'success',
                content: content
            });
        });

        events.on('toast-info', function(content) {
            events.emit('toast', {
                type: 'info',
                content: content
            });
        });
    }

    execute() {
        this.toastListener.$inject = ['events', '$mdToast'];
        this.run(this.toastListener);
    }
}

module.exports = Feature;
