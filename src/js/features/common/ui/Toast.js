/**
 *  Defines the Toast
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';

import FeatureBase from 'lib/FeatureBase';
import { merge } from 'angular';

class Feature extends FeatureBase {
    constructor() {
        super('ToastModule');
    }

    beforeStart() {};

    execute() {

        var defaults = {
            content: '',
            position: 'top right',
            delay: 3000
        };

        this.run([
            'events',
            '$mdToast',
            function(events, $mdToast) {

                events.on('toast', function(data) {
                    var opts = merge({}, defaults, data);
                    $mdToast.show(
                        $mdToast.simple()
                            .content(opts.content)
                            .position(opts.position)
                            .hideDelay(opts.delay)
                    );
                });
            }
        ]);
    }
}

export default Feature;
