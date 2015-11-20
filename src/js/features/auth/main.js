/**
 * ******************************************************************************************************
 *
 *   Defines a auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
var FeatureBase = require('lib/FeatureBase');
var Routes = require('./Routes');
var LoginController = require('./controller/LoginController');
var SetDBController = require('./controller/SetDBController');
var SignupController = require('./controller/SignupController');
var ForgetController = require('./controller/ForgetController');
var AuthService = require('./service/AuthService');
var ShakeIcon = require('./directive/ShakeIcon');

class Feature extends FeatureBase {

    constructor() {
        super('auth');
        this.routes = Routes;
    }

    execute() {
        this.controller('LoginController', LoginController);
        this.controller('SetDBController', SetDBController);
        this.controller('SignupController', SignupController);
        this.controller('ForgetController', ForgetController);
        this.service('AuthService', AuthService);
        this.directive('shakeIcon', ShakeIcon);
    }
}

module.exports = Feature;
