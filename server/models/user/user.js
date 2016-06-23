'use strict';
const mongoose = require('mongoose');

// Schema 结构
const userSchema = new mongoose.Schema({
    account: {type: String},
    password: {type: String},
    age: {type: Number, default: 35},
    createTime: {type: Date, default: Date.now}
});

// 关联数据库和表
module.exports = global.db.model('User', userSchema, 'User');

