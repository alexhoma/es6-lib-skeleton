const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const plugins = [
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        compress: {warnings: false},
        output: {comments: false}
    })
];

/**
 * Production configuration
 */
const browserConfig = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'name.min.js',
        libraryTarget: 'umd',
        library: 'name'
    },
    plugins: plugins
});

module.exports = [browserConfig];