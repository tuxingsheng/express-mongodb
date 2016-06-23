'use strict';
const webpack = require('webpack');
const alias = require('./webpack/alias');
const cf = require('./webpack/configure');
const htmlPlugin = require('./webpack/htmlPlugin');
const chunkPlugin = require('./webpack/chunkPlugin');
const plugins = [];

module.exports = {
    entry: {},
    output: {
        path: cf.BUILD(),
        publicPath: '/',
        filename: 'javascript/[name]/[name].bundle.js',
        chunkFilename: 'javascript/[name]/[name].chunk.bundle.js'
    },
    plugins: plugins.concat(htmlPlugin, chunkPlugin),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loaders: [
                    'file?name=style/[name]/[name].bundle.css',
                    'extract',
                    'css'
                ]
            },
            {
                test: /\.less$/,
                loaders: [
                    'file?name=style/[name]/[name].bundle.css',
                    'extract',
                    'css',
                    'less'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html?attrs[]=img:src&attrs[]=link:href'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=style/fonts/[name].bundle.[ext]'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: ( process.env.NODE_ENV == 'develop' ) ?
                    ['url?limit=4096&name=images/[path][name].[ext]&context=' + (cf.CLIENT()) + ''] :
                    ['url?limit=4096&name=images/[path][name].[ext]&context=' + (cf.CLIENT()) + '',
                        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    externals: {},
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.html', '.less'],
        alias: alias.alia
    }
};
