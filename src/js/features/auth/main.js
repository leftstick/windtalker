/**
 * ******************************************************************************************************
 *
 *   Defines a auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 24, 2015
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
        this.directive('shakeIcon', ShakeIcon);
    }
}

module.exports = Feature;
