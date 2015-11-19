/**
 *  Defines the TopNavbar Module.
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
import angular from 'angular';
import FeatureBase from 'lib/FeatureBase';
import tpl from './TopNavbar.html';
import asideTpl from './Aside.html';

class Feature extends FeatureBase {

    constructor() {
        super('TopnavModule');
        this.$body = angular.element(document.body);
    }

    beforeStart() {
        this.$body.prepend(tpl);
    }

    run() {
        this.run([
            '$templateCache',
            function($templateCache) {
                $templateCache.put('aside', asideTpl);
            }
        ]);
        this.controller('HeaderCtrl', [
            function() {}
        ]);
    }
}

export default Feature;
