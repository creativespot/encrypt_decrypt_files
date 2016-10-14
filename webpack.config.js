'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


const isProduction = process.env.NODE_ENV === 'production';
const minPostfix = isProduction ? '.min' : '';
const minify = isProduction ? 'minimize' : '';
const hash = '[hash:7]';

const entry = './assets/index.js';
const basePlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(`style.${hash}${minPostfix}.css`, {
        allChunks: false
    }),
    new HTMLWebpackPlugin({
        title: 'Web Starter Kit for Amaze UI',
        template: 'index.html',
        inject: false,
        prod: isProduction,
        minify: isProduction ? {
            removeComments: true,
            collapseWhitespace: true
        } : null,
    }),
];
const envPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {comments: false}
    }),
    new webpack.BannerPlugin(`build: ${new Date().toString()}`),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
];

var config = {
    debug: !isProduction,
    devtool: !isProduction ? '#eval' : null,
    entry: entry,

    output: {
        path: path.join(__dirname, 'dist'),
        filename: `js/app.${hash}${minPostfix}.js`,
        publicPath: './'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    // 'eslint',
                ],
                include: [
                    path.join(__dirname, 'assets/js')
                ]
            },
            {
                test: /\.jsx$/,
                loaders: [
                    'babel',
                ],
                include: [
                    path.join(__dirname, 'assets/jsx')
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    `css?${minify}!postcss`
                ),
                include: [
                    path.join(__dirname, 'assets/css')
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
                loaders: [
                    'file?name=[path][name].[ext]&context=assets',
                    'image-webpack'
                ]
            },
            {
                test: /\.txt$|\.json$|\.webapp$/,
                loader: 'file?name=[path][name].[ext]&context=assets'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=[path][name].[ext]&context=assets'//'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=[path][name].[ext]&context=assets'
            }
        ]
    },

    plugins: basePlugins.concat(envPlugins),

    externals: {
        'jquery': 'jQuery',
        'amazeui': 'AMUI'
    },

    // watch: !isProduction,

    // loader config
    postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions']})],

    // @see https://www.npmjs.com/package/image-webpack-loader
    imageWebpackLoader: {}
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
