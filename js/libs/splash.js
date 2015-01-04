/**
 *  Defines the splash
 *
 *  @author  Hao.Zuo
 *  @date    Dec 24th, 2014
 *
 */
(function(define) {
    'use strict';

    var splashHtml = '<div class="splash"></div>';

    define(['jquery'], function($) {

        var $body = $('body');

        var splash = {};

        splash.enable = function(theme) {
            $body.addClass('splashing');
            $body.append(splashHtml);
            var $splash = $body.find('.splash');
            if (theme === 'tailing') {
                $splash.append('<span>Loading</span>');
            }
            $splash.addClass(theme);
        };

        splash.destroy = function() {
            $body.removeClass('splashing');
            $body.find('.splash').remove();
        };

        return splash;
    });

})(define);
