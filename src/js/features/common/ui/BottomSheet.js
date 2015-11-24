/**
 *  Defines the BottomSheet
 *
 *  @author  Howard.Zuo
 *  @date    Nov 22, 2015
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

    execute() {
        var defaults = {template: '', event: null};

        this.run([
            'events',
            '$mdBottomSheet',
            function(events, $mdBottomSheet) {

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
        ]);
    }
}

module.exports = Feature;
