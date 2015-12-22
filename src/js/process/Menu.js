'use strict';

var Menu = require('menu');
var electron = require('electron');



var MenuHandler = function(app) {

    var template = [
        {
            label: 'Application',
            submenu: [
                {
                    label: 'About Application',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function() {
                        if (process.platform == 'darwin') {
                            return 'Ctrl+Command+F';
                        } else {
                            return 'F11';
                        }
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    }
                }
            ]
        },
    ];

    if (process.env.NODE_ENV !== 'dev') {
        app.on('ready', function() {
            Menu.setApplicationMenu(Menu.buildFromTemplate(template));
        });
    }
};

module.exports = MenuHandler;
