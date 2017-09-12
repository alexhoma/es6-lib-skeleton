/**
 * Webpack
 */
const path = require('path');
const webpack = require('webpack');
const ENV = require('yargs').argv.env;

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const LIBRARY_NAME = 'cool-lib';
let plugins = [], filename;

/**
 * Environment dependencies
 */
if (ENV === 'build') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }));
    filename = LIBRARY_NAME + '.min.js';
} else {
    filename = LIBRARY_NAME + '.js';
}

/**
 * Webpack configuration
 */
module.exports = {
    entry: SRC_DIR + '/index.js',
    devtool: 'source-map',
    output: {
        path: DIST_DIR,
        filename: filename,
        library: LIBRARY_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ['.json', '.js']
    },
    plugins: plugins
};