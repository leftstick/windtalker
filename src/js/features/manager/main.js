/**
 * ******************************************************************************************************
 *
 *   Defines a manager feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 25, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var ManagerController = require('./controller/ManagerController');
var SettingController = require('./controller/SettingController');
var CreateController = require('./controller/CreateController');
var ManagerService = require('./service/ManagerService');
var SearchFilter = require('./filter/SearchFilter');
var ItemInput = require('./directive/ItemInput');
var ItemEdit = require('./directive/ItemEdit');

class Feature extends FeatureBase {

    constructor() {
        super('manager');
        this.routes = Routes;
    }

    execute() {
        this.controller('ManagerController', ManagerController);
        this.controller('SettingController', SettingController);
        this.controller('CreateController', CreateController);
        this.service('ManagerService', ManagerService);
        this.filter('searchFilter', SearchFilter);
        this.directive('itemInput', ItemInput);
        this.directive('itemEdit', ItemEdit);
    }
}

module.exports = Feature;
