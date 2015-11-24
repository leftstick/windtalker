/**
 * ******************************************************************************************************
 *
 *   Defines a manager feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var ManagerController = require('./controller/ManagerController');
var SettingController = require('./controller/SettingController');
var ManagerService = require('./service/ManagerService');
var SearchFilter = require('./filter/SearchFilter');

class Feature extends FeatureBase {

    constructor() {
        super('manager');
        this.routes = Routes;
    }

    execute() {
        this.controller('ManagerController', ManagerController);
        this.controller('SettingController', SettingController);
        this.service('ManagerService', ManagerService);
        this.filter('searchFilter', SearchFilter);
    }
}

module.exports = Feature;
