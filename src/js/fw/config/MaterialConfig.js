/**
 *  MaterialConfig set angular-material needed configuration
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var ConfiguratorBase = require('lib/ConfiguratorBase');

class Configurator extends ConfiguratorBase {
    constructor(features, app) {
        super(features, app);
    }

    execute() {
        this.app.config([
            '$mdThemingProvider',
            function($mdThemingProvider) {
                $mdThemingProvider
                    .theme('default')
                    .primaryPalette('blue')
                    .accentPalette('orange')
                    .warnPalette('red');
            }
        ]);
    }
}

module.exports = Configurator;
