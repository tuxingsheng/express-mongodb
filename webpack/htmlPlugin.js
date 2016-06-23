'use strict';
const hp = [];
const path = require('path');
const alias = require('./alias');
const cf = require('./configure');
const fp = require('./filesPath');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fp_html = fp('client/views/**/*.html', 'client/', '');

fp_html.dist.forEach(function (e, i) {
    hp.push(
        new HtmlWebpackPlugin({
            hash: true,
            inject: 'body',
            chunks: alias.name.concat(fp_html.name[i]),
            // 目标文件
            filename: e,
            // 模板文件
            template: cf.CLIENT(e)
        })
    )
});

module.exports = hp;









