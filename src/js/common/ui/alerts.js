/**
 *  Defines the Alerts
 *
 *  @author  Hao.Zuo
 *  @date    Feb 11th, 2015
 *
 */
(function(define, global) {
    'use strict';

    define(['angular'], function(angular) {

        var moduleName = 'Alerts';

        var TYPES = {
            alert: 'alert',
            notification: 'notification',
            warning: 'warning',
            error: 'error',
            info: 'information',
            success: 'success',
            confirm: 'confirm'
        };

        var TIMEOUTS = {
            alert: 3000,
            notification: 3000,
            warning: 3000,
            error: 5000,
            info: 3000,
            success: 3000,
            confirm: false
        };

        var ANIMATIONS_IN = {
            alert: 'bounceInRight',
            notification: 'bounceInRight',
            warning: 'bounceInLeft',
            error: 'wobble',
            info: 'bounceInRight',
            success: 'bounceInRight',
            confirm: 'fadeIn'
        };

        var ANIMATIONS_OUT = {
            alert: 'bounceOutLeft',
            notification: 'bounceOutLeft',
            warning: 'bounceOutRight',
            error: 'flipOutX',
            info: 'bounceOutLeft',
            success: 'bounceOutLeft',
            confirm: 'flipOutX'
        };

        var emptyFunc = function() {};

        var common = angular.module(moduleName, []);

        common.run(['events',
            function(events) {

                events.on('alert', function(data) {
                    global.noty({
                        layout: data.type === 'confirm' ? 'center' : 'topRight',
                        text: data.message,
                        type: TYPES[data.type],
                        animation: {
                            open: 'animated ' + ANIMATIONS_IN[data.type], // Animate.css class names
                            close: 'animated ' + ANIMATIONS_OUT[data.type], // Animate.css class names
                            easing: 'swing', // unavailable - no need
                            speed: 500 // unavailable - no need
                        },
                        timeout: TIMEOUTS[data.type],
                        dismissQueue: true,
                        maxVisible: 6,
                        closeWith: data.type === 'confirm' ? ['backdrop'] : ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
                        callback: {
                            onShow: data.onShow || emptyFunc,
                            afterShow: data.afterShow || emptyFunc,
                            onClose: data.onClose || emptyFunc,
                            afterClose: data.afterClose || emptyFunc,
                            onCloseClick: data.onCloseClick || emptyFunc,
                        },
                        buttons: (data.type !== 'confirm') ? false : [{
                            addClass: 'btn btn-primary',
                            text: '确定',
                            onClick: function($noty) {
                                $noty.close();
                                (data.onOkClick || emptyFunc)();
                            }
                        }, {
                            addClass: 'btn btn-danger',
                            text: '取消',
                            onClick: function($noty) {
                                $noty.close();
                                (data.onCancelClick || emptyFunc)();
                            }
                        }]
                    });

                });

            }
        ]);

        return {
            type: 'feature',
            name: moduleName
        };

    });

})(define, window);
