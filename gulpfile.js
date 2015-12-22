'use strict';

var gulp = require('gulp');
var resolve = require('path').resolve;

var logger = console.log;

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
    var config;

    if (isDev) {
        config = require(resolve(__dirname, 'webpack.config.dev'));
    } else {
        config = require(resolve(__dirname, 'webpack.config.prod'));
    }
    var passwordOpts = JSON.stringify({password: password});

    config.module.loaders[0].loader = config.module.loaders[0].loader + new Buffer(passwordOpts).toString('base64');

    var compiler = webpack(config);

    if (isDev) {
        compiler.watch({aggregateTimeout: 500, poll: true}, function(err, stats) {
            if (err) {
                logger('[ERROR]: ', err);
                return;
            }
            handleStatsError(stats);
        });
        return;
    }

    compiler.run(function(err, stats) {
        if (err) {
            cb(err);
            return;
        }
        cb();
    });
};

gulp.task('clean-dist', function() {
    return require('rimraf').sync(resolve(__dirname, 'dist'));
});

gulp.task('clean-build', function() {
    return require('rimraf').sync(resolve(__dirname, 'src', 'build'));
});

gulp.task('copy-index', function() {
    return gulp
        .src(['./src/index.html'])
        .pipe(gulp.dest('./src/build'));
});

gulp.task('copy-package.json', function() {
    return gulp
        .src(['./package.json'])
        .pipe(gulp.dest('./src/build'));
});

gulp.task('copy-process', function() {
    return gulp
        .src(['./src/js/process/**/*'])
        .pipe(gulp.dest('./src/build/js/process'));
});

gulp.task('watch', [
    'copy-index',
    'copy-package.json',
    'copy-process',
    'clean-build'
], function(cb) {
    compile(true, cb);
});

gulp.task('compile-release', [
    'copy-index',
    'copy-package.json',
    'copy-process',
    'clean-build',
    'clean-dist'
], function(cb) {
    if (!password) {
        logger('WARNING: you have to specify encryption password by -p');
        process.exit(0);
    }
    compile(false, cb);
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
            version: 'v0.36.1',
            packaging: true,
            asar: true,
            platforms: [
                'darwin-x64',
                'win32-x64'
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
