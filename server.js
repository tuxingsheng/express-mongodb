'use strict';
const express = require('express');
const webpack = require('webpack');
const cons = require('consolidate');
// webpack config
const cf = require('./webpack/configure');
// cookie-parser
const cookieParser = require('cookie-parser');
// express-session
const session = require('express-session');
// body-parser
const bodyParser = require('body-parser');
// mongodb connect
const DB = require('./server/modules/db/db');
// webpack.dev.config
const webpackConfig = require('./webpack.dev.config');
// log4js module
const logger = require('./server/modules/logger/logger');
// webpack-dev-middleware
const webpackDevMiddleware = require('webpack-dev-middleware');
// webpack-hot-middleware
const webpackHotMiddleware = require('webpack-hot-middleware');
// express application
const app = express();
// browser-sync
const bs = require('browser-sync').create();
// express-validator
const expressValidator = require('express-validator');
// express-validator customValidators
const validators = require('./server/utils/validators/validators');

webpackConfig.plugins = webpackConfig.plugins.concat([
    function () {
        this.plugin('done', function (stats) {
            stats = stats.toJson();
            // 获取6位hash值
            // stats.hash = stats.hash.substring(0, 6);
            app.locals.env = 'develop';
            app.locals.staticMap = stats;
            app.locals.staticMap.browser = cf.PATH;
        });
    }
]);

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

// 模板配置
app.set('views', cf.SERVER('views'));
app.engine('html', cons.ejs);
app.set('view engine', 'html');

// app bodyParser & app cookieParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    name: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {path: '/', httpOnly: true, secure: false, maxAge: 3600000}
}));
app.use(expressValidator({customValidators: validators}));

// app logger
logger.use(app, 'http');
// route assemblage
const route = require('./server/routes/route')(app);
// controller assemblage
const control = require('./server/controls/control')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('404，不存在');
});

app.listen(cf.NODE_PORT, function () {
    bs.init({
        ui: false,
        open: false,
        notify: false,
        logSnippet: false,
        port: cf.PORT
    });
    bs.watch([
        './server/views/**/*.html'
    ]).on('change', bs.reload);
    console.log('nodeJs开发服务器，已开启，port---', cf.NODE_PORT);
});
