'use strict';

module.exports = [
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
                    require('electron').remote.app.quit();
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
                label: 'Reload',
                visible: process.env.NODE_ENV === 'dev',
                accelerator: 'CmdOrCtrl+R',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
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
            },
            {
                label: 'Toggle Developer Tools',
                visible: process.env.NODE_ENV === 'dev',
                accelerator: (function() {
                    if (process.platform == 'darwin') {
                        return 'Alt+Command+I';
                    } else {
                        return 'Ctrl+Shift+I';
                    }
                })(),
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            },
        ]
    }
];
