/**
 *  ConfiguratorBase class
 *
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';
class ConfiguratorBase {

    constructor(features, app) {
        this.features = features;
        this.app = app;
    }

    execute() {}
}

module.exports = ConfiguratorBase;
