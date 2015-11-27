'use strict';

var gulp = require('gulp');
var os = require('os');
var ncp = require('ncp').ncp;

var path = require('path');
var resolve = path.resolve;

var logger = console.log;

var SYSTEMS = {darwin: 'osx', win32: 'win', linux: 'linux'};

var argv = require('minimist')(process.argv.slice(2));

var password = argv.p;

var getTime = function() {
    var d = new Date();
    return d.getHours() + ':' + d.getMinutes() + ' ' + d.getSeconds() + '-' + d.getMilliseconds();
};

var handleStatsError = function(stats) {
    var info = stats.toJson();
    if (info.errors.length > 0) {
        logger('[webpack]', stats.toString({colors: true}));
        logger('\n [ ' + getTime() + ' ]   webpack: bundle is now INVALID.');
        return;
    }
    logger('\n [ ' + getTime() + ' ]   webpack: bundle is now VALID!');
};

var compile = function(isDev, cb) {
    var webpack = require('webpack');
    var go = require('go-txt');
    var config;

    var indexVm = resolve(__dirname, 'src', 'index.html');
    var indexHtml = resolve(__dirname, 'src', 'build', 'index.html');

    if (isDev) {
        config = require(resolve(__dirname, 'webpack.config.dev'));
    } else {
        config = require(resolve(__dirname, 'webpack.config.prod'));
    }
    var passwordOpts = new Buffer(JSON.stringify({
        password: password
    })).toString('base64');
    config.module.loaders[0].loader = config.module.loaders[0].loader + passwordOpts;

    require('rimraf').sync(resolve(__dirname, 'src', 'build'));
    go(resolve(__dirname, 'package.json'), resolve(__dirname, 'src', 'build', 'package.json'));

    var compiler = webpack(config);

    go(indexVm, indexHtml);

    if (isDev) {
        compiler.watch({aggregateTimeout: 500, poll: true}, function(err, stats) {
            if (err) {
                logger('[ERROR]: ', err);
                return;
            }
            ncp(resolve(__dirname, 'src', 'js', 'process'), resolve(__dirname, 'src', 'build', 'js', 'process'), function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log('done!');
            });
            handleStatsError(stats);
        });
        return;
    }

    compiler.run(function(err, stats) {
        if (err) {
            cb(err);
            return;
        }
        ncp(resolve(__dirname, 'src', 'js', 'process'), resolve(__dirname, 'src', 'build', 'js', 'process'), function(err) {
            if (err) {
                return console.error(err);
            }
            cb();
        });
        handleStatsError(stats);
    });
};

gulp.task('compile-dev', function(cb) {
    compile(true, cb);
});

gulp.task('compile-release', ['clean-dist'], function(cb) {
    if (!password) {
        console.warn('WARNING: you have to specify encryption password by -p');
        process.exit(0);
    }
    compile(false, cb);
});

gulp.task('clean-dist', function() {
    return require('rimraf').sync(resolve(__dirname, 'dist'));
});

gulp.task('release', ['compile-release'], function() {

    var electron = require('gulp-electron');
    var packageJson = require('./package.json');
    return gulp.src('')
        .pipe(electron({
            src: './src/build/',
            packageJson: packageJson,
            release: './dist',
            cache: './cache',
            version: 'v0.35.0',
            packaging: true,
            asar: true,
            platforms: [
                'darwin-x64'
            ],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    icon: 'icon/windtalker.icns'
                },
                win: {
                    'version-string': packageJson.version,
                    'file-version': packageJson.version,
                    'product-version': packageJson.version,
                    'icon': 'icon/windtalker.ico'
                }
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('dev', function(cb) {
    require('child_process')
        .exec('node ./node_modules/.bin/electron --debug=5858 ./src/build/', {
            cwd: __dirname,
            env: {
                NODE_ENV: 'dev'
            }
        }, cb);
});
