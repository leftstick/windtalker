'use strict';
var path = require('path');
var webpack = require('webpack');

var presetsQuery = JSON.stringify({
    presets: [
        'es2015'
    ],
    plugins: [
        'transform-runtime'
    ]
});

module.exports = {
    entry: {
        index: './src/js/index.js',
        main: './src/js/process/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'src', 'build', 'js'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        publicPath: 'js/'
    },
    target: 'electron',
    node: {
        __dirname: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?' + presetsQuery + '!modify?value=',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer?browsers=last 5 version!less!'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'src', 'js'),
            path.resolve(__dirname, 'src', 'js', 'fw')
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
