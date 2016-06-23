'use strict';
const config = require('../../config');
const mongoose = require('mongoose');
const db = mongoose.createConnection(config.mongodb, config.mongo_opts, function () {
    console.log('mongodb连接成功，连接地址：', config.mongodb);
});

// 链接错误
db.on('error', function (error) {
    console.log('mongodb连接失败，错误信息：', error);
});

global.db = db;


