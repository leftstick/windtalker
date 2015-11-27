'use strict';

var path = require('path');
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;

var startupOpts = {
    useContentSize: true,
    center: true,
    resizable: process.env.NODE_ENV === 'dev',
    alwaysOnTop: false,
    fullscreen: false,
    skipTaskbar: true,
    kiosk: false,
    title: '',
    icon: null,
    show: false,
    frame: true,
    disableAutoHideCursor: false,
    autoHideMenuBar: false,
    titleBarStyle: 'default'
};

var Launcher = function(app) {
    return new Promise(function(resolve, reject) {
        app.on('ready', function() {
            var mainWindow = new BrowserWindow(startupOpts);
            mainWindow.loadURL('file://' + path.resolve(__dirname, '..', '..') + '/index.html');
            mainWindow.on('closed', function() {
                mainWindow = null;
            });
            mainWindow.show();
            resolve(mainWindow);
        });
    });
};

module.exports = Launcher;
