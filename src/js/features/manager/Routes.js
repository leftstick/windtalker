/**
 *
 *  Routes module expose route information used in auth feature
 *
 *  @author  Howard.Zuo
 *  @date    Nov 21, 2015
 *
 */
'use strict';

var tpl = require('./partials/manager.html');

module.exports = [
    {
        id: 'manager',
        isDefault: false,
        when: '/manager/:userId',
        controller: 'ManagerController',
        resolve: {
            user: [
                'AuthService',
                '$route',
                function(AuthService, $route) {
                    return AuthService.getUserById($route.current.params.userId);
                }
            ]
        },
        template: tpl,
        size: {
            width: 750,
            height: 700,
            resizable: true,
            minWidth: 500,
            minHeight: 300
        }
    }
];
