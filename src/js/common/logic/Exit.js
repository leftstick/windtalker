/**
 *
 *  Exit service provide shortcut for users whom want to quit quickly
 *
 *  @author  Howard.Zuo
 *  @date    Mar 9th, 2015
 *
 */
(function(define, global) {
    'use strict';

    define(['angular', 'lodash'], function(angular, _) {

        var modulename = 'ExitModule';

        var module = angular.module(modulename, []);

        var win = global.gui.Window.get();

        module.run([
            'auth',
            'key',
            'utils',
            function(auth, key, utils) {

                key.on('esc', _.debounce(function(e) {

                    if (!auth.currentUser()) {
                        win.close(true);
                        return;
                    }

                    utils.stopEvent(e);
                    win.close();
                }, 150));


            }
        ]);

        return {name: modulename};

    });

}(define, this));
