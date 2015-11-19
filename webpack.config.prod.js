'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'src', 'build', 'js'),
        filename: '[hash].[name].bundle.js',
        chunkFilename: '[hash].[id].bundle.js',
        publicPath: 'js/'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!autoprefixer?browsers=last 5 version!less!'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'es2015'
                    ]
                }
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
        }),
        new webpack.optimize.CommonsChunkPlugin('[hash].common.bundle.js')
    ]
};
