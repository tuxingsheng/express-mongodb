'use strict';

/*
* server端配置文件
* */
module.exports = {
    // mongodb connection address
    mongodb: 'mongodb://127.0.0.1:27017/test',
    // mongodb options
    mongo_opts: {
        server: {
            auto_reconnect: true
        },
        user: '',
        pass: ''
    },
    // 邮箱配置
    mail_opts: {
        // 服务商
        sp: 'QQ',
        // 用户名
        user: '573785073@qq.com',
        // 密码
        pass: 'lkjrnimglckybdbe'
    },
};










