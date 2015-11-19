/**
 *  MaterialConfig set angular-material needed configuration
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';
import ConfiguratorBase from 'lib/ConfiguratorBase';

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

export default Configurator;
