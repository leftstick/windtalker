'use strict';

var ExitHandler = function(app) {
    app.on('window-all-closed', function() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
};

module.exports = ExitHandler;
