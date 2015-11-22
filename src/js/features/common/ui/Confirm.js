/**
 *  Defines the Confirm
 *
 *  @author  Howard.Zuo
 *  @date    Nov 22, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var merge = require('angular').merge;

class Feature extends FeatureBase {
    constructor() {
        super('ConfirmModule');
    }

    beforeStart() {};

    execute() {

        var defaults = {
            title: '确认',
            content: '',
            event: null,
            okTxt: '确定',
            cancelTxt: '取消',
            onComplete: function() {},
            onCancel: function() {}
        };

        this.run([
            'events',
            '$mdDialog',
            function(events, $mdDialog) {

                events.on('confirm', function(data) {
                    var opts = merge({}, defaults, data);

                    var confirm = $mdDialog.confirm()
                        .title(opts.title)
                        .content(opts.content)
                        .targetEvent(opts.event)
                        .ok(opts.okTxt)
                        .cancel(opts.cancelTxt);

                    $mdDialog.show(confirm).then(opts.onComplete, opts.onCancel);
                });
            }
        ]);
    }
}

module.exports = Feature;
