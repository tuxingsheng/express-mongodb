'use strict';
const cp = [];
const alias = require('./alias');
const webpack = require('webpack');

if (alias.name.length != 0) {
    cp.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: alias.name,
            minChunks: Infinity
        })
    );
}

module.exports = cp;











