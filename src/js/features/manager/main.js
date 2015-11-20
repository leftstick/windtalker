/**
 * ******************************************************************************************************
 *
 *   Defines a manager feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var ManagerController = require('./controller/ManagerController');
var ManagerService = require('./service/ManagerService');

class Feature extends FeatureBase {

    constructor() {
        super('manager');
        this.routes = Routes;
    }

    execute() {
        this.controller('ManagerController', ManagerController);
        this.service('ManagerService', ManagerService);
    }
}

module.exports = Feature;
