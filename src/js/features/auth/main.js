/**
 * ******************************************************************************************************
 *
 *   Defines a auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 * ******************************************************************************************************
 */
'use strict';
import FeatureBase from 'lib/FeatureBase';
import Routes from './Routes';
import LoginController from './controller/LoginController';
import SetDBController from './controller/SetDBController';
import SignupController from './controller/SignupController';
import AuthService from './service/AuthService';
import ShakeIcon from './directive/ShakeIcon';

class Feature extends FeatureBase {

    constructor() {
        super('auth');
        this.routes = Routes;
    }

    execute() {
        this.controller('LoginController', LoginController);
        this.controller('SetDBController', SetDBController);
        this.controller('SignupController', SignupController);
        this.service('AuthService', AuthService);
        this.directive('shakeIcon', ShakeIcon);
    }
}

export default Feature;
