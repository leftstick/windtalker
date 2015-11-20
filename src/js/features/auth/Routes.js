/**
 *
 *  Routes module expose route information used in auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var tpl = require('./partials/login.html');
var dbTpl = require('./partials/setdb.html');
var signupTpl = require('./partials/signup.html');
var forgetTpl = require('./partials/forget.html');

module.exports = [
    {
        id: 'login',
        isDefault: true,
        when: '/login',
        controller: 'LoginController',
        template: tpl,
        size: {
            width: 500,
            height: 400
        }
    },
    {
        id: 'setdb',
        isDefault: false,
        when: '/setdb',
        controller: 'SetDBController',
        template: dbTpl,
        size: {
            width: 500,
            height: 300
        }
    },
    {
        id: 'signup',
        isDefault: false,
        when: '/signup',
        controller: 'SignupController',
        template: signupTpl,
        size: {
            width: 500,
            height: 600
        }
    },
    {
        id: 'forget',
        isDefault: false,
        when: '/forget',
        controller: 'ForgetController',
        template: forgetTpl,
        size: {
            width: 500,
            height: 400
        }
    }
];
