'use strict';
const express = require('express');
const cons = require('consolidate');
const stats = require('./stats.json');
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
// express application
const app = express();
// express-validator
const expressValidator = require('express-validator');
// express-validator customValidators
const validators = require('./server/utils/validators/validators');

// 静态资源路径
app.use(express.static(cf.BUILD()));
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

// app locals
app.locals.env = 'production';
app.locals.staticMap = stats;
// route assemblage
const route = require('./server/routes/route')(app);
// controller assemblage
const control = require('./server/controls/control')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('404，不存在');
});

app.listen(cf.NODE_PORT, function () {
    console.log('nodeJs开发服务器，已开启，port---', cf.NODE_PORT);
});

