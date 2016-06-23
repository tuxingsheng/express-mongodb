'use strict';
const alias = require('./alias');
const cf = require('./configure');
const fp = require('./filesPath');
const entry = alias.alia;
const fp_js = fp('client/resources/**/*.js', 'client/', '');
const webpackDevServer = 'webpack-dev-server/client?' + (cf.PATH) + '';
const hotMiddlewareScript = 'webpack-hot-middleware/client?quiet=true&reload=true&path=/__webpack_hmr';

fp_js.dist.forEach(function (e, i) {
    switch (process.env.NODE_ENV) {
        // 静态调试
        case 'develop':
            entry[fp_js.name[i]] = [webpackDevServer, cf.CLIENT(fp_js.dist[i])];
            break;
        // node调试
        case 'server':
            entry[fp_js.name[i]] = [hotMiddlewareScript, cf.CLIENT(fp_js.dist[i])];
            break;
        // 默认是(production)
        default :
            entry[fp_js.name[i]] = cf.CLIENT(fp_js.dist[i]);
    }
});

console.log('process.env.NODE_ENV------------------', process.env.NODE_ENV);

module.exports = entry;
