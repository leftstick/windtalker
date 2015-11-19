/**
 *
 *  Routes module expose route information used in auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';

import tpl from './partials/login.html';
import dbTpl from './partials/setdb.html';

export default [
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
    }
];
