/**
 *  Defines the SetDBController controller
 *
 *  @author  Howard.Zuo
 *  @date    Nov 19, 2015
 *
 */
'use strict';
import debounce from 'lib/Debounce';

var mainWindow = nativeRequire('electron').remote.getCurrentWindow();
var dialog = nativeRequire('electron').remote.require('dialog');
var fs = nativeRequire('fs');

var DB_ADDRESS_KEY = 'windtaler.dbaddress';

var SetDBController = function($scope, events, utils, $interval, $timeout, StorageService) {

    $scope.db = {address: StorageService.get(DB_ADDRESS_KEY)};

    $scope.state = {shake: '', invalidAddress: false};
    var shakePromise = $interval(function() {
        $scope.state.shake = 'bounce';
        $timeout(function() {
            $scope.state.shake = '';
        }, 1000);
    }, 5000);

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
        StorageService.set(DB_ADDRESS_KEY, $scope.db.address);
        events.emit('toast', {content: '数据库目录锁定成功！'});
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
        $interval.cancel(shakePromise);
        unwatch();
    });
};

export default [
    '$scope',
    'events',
    'utils',
    '$interval',
    '$timeout',
    'StorageService',
    SetDBController
];
