'use strict';

var gulp = require('gulp');
var os = require('os');

var SYSTEMS = {
    darwin: 'osx',
    win32: 'win'
};

var devBuild = !require('minimist')(process.argv.slice(2)).prod;

gulp.task('clean', function(cb) {
    var rimraf = require('rimraf');
    rimraf('build/', cb);
});

gulp.task('less', ['clean'], function() {
    var less = require('gulp-less');
    var LessPluginAutoPrefix = require('less-plugin-autoprefix');
    var autoprefix = new LessPluginAutoPrefix({
        browsers: ['last 5 versions']
    });

    return gulp.src('src/less/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('gen-pkg', function() {
    var template = require('gulp-template');
    var rename = require('gulp-rename');
    return gulp.src('src/package.json_vm')
        .pipe(template({
            devBuild: devBuild
        }))
        .pipe(rename({
            extname: '.json'
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('install', ['less', 'gen-pkg'], function() {
    var install = require('gulp-install');
    return gulp.src(['./bower.json', './src/package.json'])
        .pipe(install());
});

gulp.task('default', ['install'], function() {
    var NwBuilder = require('node-webkit-builder');

    var platforms = devBuild ? [SYSTEMS[os.platform()] + os.arch().substring(1)] : ['osx64', 'win64'];
    var nw = new NwBuilder({
        files: ['./src/css/**/*.*', './src/fonts/**/*.*', './src/img/**/*.*', './src/js/**/*.*', './src/node_modules/**/*.*', './src/index.html', './src/package.json'],
        version: 'v0.11.6',
        macZip: true,
        platforms: platforms
            // platforms: ['osx32', 'osx64', 'win32', 'win64']
    });

    nw.build().then(function() {
        console.log('all done!');
    }).catch(function(error) {
        console.error(error);
    });
});
