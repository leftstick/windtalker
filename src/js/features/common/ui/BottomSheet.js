/**
 *  Defines the BottomSheet
 *
 *  @author  Howard.Zuo
 *  @date    Dec 1, 2015
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var omit = require('lib/Omit');
var merge = require('angular').merge;

class Feature extends FeatureBase {
    constructor() {
        super('BottomSheetModule');
    }

    beforeStart() {};

    bottomsheetListener(events, $mdBottomSheet) {
        var defaults = {template: '', event: null};

        events.on('bottomsheet', function(data) {
            var opts = merge({}, defaults, omit(data, [
                'scope',
                'event'
            ]));

            $mdBottomSheet.show({
                template: opts.template,
                targetEvent: data.event,
                controller: opts.controller,
                locals: opts.locals,
                resolve: opts.resolve
            });
        });

        events.on('bottomsheet-hide', function(data) {
            $mdBottomSheet.hide();
        });
    }

    execute() {
        this.bottomsheetListener.$inject = [
            'events',
            '$mdBottomSheet'
        ];
        this.run(this.bottomsheetListener);
    }
}

module.exports = Feature;
