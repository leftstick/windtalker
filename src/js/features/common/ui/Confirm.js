/**
 *  Defines the Confirm
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var merge = require('angular').merge;

class Feature extends FeatureBase {
    constructor() {
        super('ConfirmModule');
    }

    beforeStart() {
    };

    confirmListener(events, $mdDialog) {
        var defaults = {
            title: '确认',
            content: '',
            okTxt: '确定',
            cancelTxt: '取消',
            onComplete: function() {},
            onCancel: function() {}
        };

        events.on('confirm', function(data) {
            var opts = merge({}, defaults, data);

            var confirm = $mdDialog.confirm()
                .title(opts.title)
                .textContent(opts.content)
                .targetEvent(data.event)
                .ok(opts.okTxt)
                .cancel(opts.cancelTxt);

            $mdDialog.show(confirm).then(opts.onComplete, opts.onCancel);
        });
    }

    execute() {
        this.confirmListener.$inject = ['events', '$mdDialog'];
        this.run(this.confirmListener);
    }
}

module.exports = Feature;
