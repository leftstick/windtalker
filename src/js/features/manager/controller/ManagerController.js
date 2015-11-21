/**
 *  Defines the ManagerController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';

var ManagerController = function($scope, events, user, $location) {
    $scope.user = user;

    $scope.todos = [
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        },
        {
            who: 'nanfeng',
            what: 'fucking yourself nige erbi',
            notes: 'i have to tell you something'
        }
    ];

    $scope.logout = function() {
        $location.url('url');
        return;
    };

    $scope.$on('$destroy', function() {});
};

module.exports = [
    '$scope',
    'events',
    'user',
    '$location',
    ManagerController
];
