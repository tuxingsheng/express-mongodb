'use strict';
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const entry = require('./webpack/entry');
const cf = require('./webpack/configure');
const baseConfig = require('./webpack.base.config');
const notes = 'Introduction：网站简介，Version：1.0.0，CreateDate：' + (new Date().toLocaleString()) + '，Author：涂兴声';

baseConfig.entry = entry;
baseConfig.output.publicPath = cf.NODE_PATH;

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.BannerPlugin(notes),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        except: ['$', 'exports', 'require']
    }),*/
    function () {
        this.plugin('done', function (stats) {
            fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(stats.toJson()));
        });
    }
]);

module.exports = baseConfig;













