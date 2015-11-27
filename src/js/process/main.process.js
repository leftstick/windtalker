'use strict';
process.env.ELECTRON_HIDE_INTERNAL_MODULES = 'true';

var electron = require('electron');
var app = electron.app;

var exitHandler = require('./ExitHandler');
var launcher = require('./Launcher');

//register exit handler
exitHandler(app);

//launch the app
launcher(app)
    .then(function(win) {
        return win;
    });
