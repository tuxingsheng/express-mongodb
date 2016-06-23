'use strict';
const fs = require('fs');
const log4js = require('log4js');
const logConfigure = require('./logsConfig');

// 如果logs根目录不存在，就创建
if (!fs.existsSync(logConfigure['logsRoot'])) {
    console.log('检测到logs根目录不存在,自动生成中...');
    fs.mkdir(logConfigure['logsRoot'], function () {
        console.log('logs根目录创建成功');
    });
}
// 如果当前类别的logs目录不存在，就创建
for (let i = 0; i < logConfigure.appenders.length; i++) {
    const log = logConfigure.appenders[i];
    if (log['type'] != 'console') {
        if (!fs.existsSync(log['filename'])) {
            console.log('检测到 ' + log['category'] + ' 类别log目录不存在,自动生成中...');
            fs.mkdir(log['filename'], function () {
                console.log(log['category'] + ' 类别log目录创建成功');
            });
        }
    }
}

// 目录存在，才执行配置文件
log4js.configure(logConfigure);

// 暴露API接口
exports.create = function (name) {
    return log4js.getLogger(name);
};

/*
* 配合express用的方法
* @param {Object} app express实例对象
* @param {String} name log4js category类别
* @param {String} level log4js 记录等级
* */
exports.use = function (app, name, level) {
    // 监控页面请求日志,level用auto时,默认级别是WARN
    app.use(log4js.connectLogger(log4js.getLogger(name), {level: (level || 'auto'), format: ':method :url'}));
};
