/**
 *
 *  CloseBlocker service requires a user reply for next move
 *
 *  @author  Howard.Zuo
 *  @date    Mar 7th, 2015
 *
 */
(function(define, global) {
    'use strict';

    define(['angular'], function(angular) {

        var modulename = 'CloseBlockerModule';

        var module = angular.module(modulename, []);

        var win = global.gui.Window.get();

        module.run([
            'events',
            'auth',
            function(events, auth) {

                win.on('close', function() {

                    if (!auth.currentUser()) {
                        win.close(true);
                        return;
                    }

                    if (angular.element('#exit.modal').length > 0) {
                        return;
                    }

                    events.emit('confirm', {
                        id: 'exit',
                        content: '您确定要退出保密局么？',
                        onConfirm: function() {
                            win.close(true);
                        }
                    });


                });

            }
        ]);

        return {name: modulename};

    });

}(define, this));
