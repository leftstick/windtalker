/**
 *  Defines the SetDBController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 20, 2015
 *
 */
'use strict';
var debounce = require('lib/Debounce');

var mainWindow = require('electron').remote.getCurrentWindow();
var dialog = require('electron').remote.require('dialog');
var fs = require('fs');

var SetDBController = function($scope, events, utils, DbService) {

    $scope.db = {address: DbService.address()};

    $scope.state = {invalidAddress: false};

    $scope.openDialog = function($event) {
        utils.stopEvent($event);
        dialog.showOpenDialog(mainWindow, {
            title: '位置选择',
            properties: [
                'openDirectory'
            ]
        }, function(files) {
            if (files && files.length) {
                $scope.db.address = files[0];
                $scope.$apply();
            }
        });
    };

    $scope.saveDB = function() {
        DbService.address($scope.db.address);
        events.emit('toast', {
            type: 'success',
            delay: 500,
            content: '数据库目录锁定成功！'
        });
    };

    var checkAddress = debounce(function(value) {
        var stat;
        try {
            stat = fs.statSync(value);
            $scope.state.invalidAddress = !stat.isDirectory();
        } catch (e) {
            $scope.state.invalidAddress = true;
        }
        $scope.$apply();
    }, 300);

    var unwatch = $scope.$watch('db.address', function(newValue) {
        if (!newValue) {
            return;
        }
        checkAddress(newValue);
    });

    $scope.$on('$destroy', function() {
        unwatch();
    });
};

module.exports = [
    '$scope',
    'events',
    'utils',
    'DbService',
    SetDBController
];
