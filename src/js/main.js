/**
 *  main.js manage the whole application.
 *
 *  @author  Howard.Zuo
 *  @date    Nov 18, 2015
 *
 */
'use strict';
import angular from 'angular';
import Initializers from 'init/main';
import Extensions from 'ext/main';
import Configurators from 'config/main';
import Services from 'service/main';
import Features from 'features/main';

class App {

    constructor() {
        this.appName = 'windtalkerr';
        this.features = [];
        Features.forEach(function(Feature) {
            this.features.push(new Feature());
        }, this);
    }

    findDependencies() {
        this.depends = Extensions.slice(0);
        var featureNames = this.features.filter(function(feature) {
            return feature.export;
        })
            .map(function(feature) {
                return feature.export;
            });
        Array.prototype.push.apply(this.depends, featureNames);
    }

    beforeStart() {
        Initializers.forEach(function(Initializer) {
            (new Initializer(this.features)).execute();
        }, this);

        this.features.forEach(function(feature) {
            feature.beforeStart();
        });
    }

    createApp() {
        this.features.forEach(function(feature) {
            feature.execute();
        });
        this.app = angular.module(this.appName, this.depends);
    }

    configApp() {
        Configurators.forEach(function(Configurator) {
            (new Configurator(this.features, this.app)).execute();
        }, this);
    }

    registerService() {
        Services.forEach(function(Service) {
            (new Service(this.features, this.app)).execute();
        }, this);
    }

    launch() {
        angular.bootstrap(document, [this.appName]);
    }

    run() {
        this.findDependencies();
        this.beforeStart();
        this.createApp();
        this.configApp();
        this.registerService();
        this.launch();
    }

}

export default App;
