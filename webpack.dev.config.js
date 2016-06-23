'use strict';
const webpack = require('webpack');
const entry = require('./webpack/entry');
const cf = require('./webpack/configure');
const baseConfig = require('./webpack.base.config');

baseConfig.entry = entry;
baseConfig.output.publicPath = ( process.env.NODE_ENV == 'develop' ) ? cf.PATH : cf.NODE_PATH;

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
]);

baseConfig.devServer = {
    hot: true,
    port: 8090,
    inline: true,
    progress: true,
    contentBase: 'build/',
    outputPath: cf.BUILD(),
    stats: {color: true},
    historyApiFallback: true
};

module.exports = baseConfig;

