'use strict';
const path = require('path');

module.exports = {
    logsRoot: path.resolve(__dirname + '../../../../server/logs/'),
    appenders: [
        {
            type: 'console',
            category: 'console'
        },
        {
            type: 'dateFile',
            filename: path.resolve(__dirname + '../../../../server/logs/http/'),
            pattern: '/yyyyMMddhh.log',
            maxLogSize: '1024 * 1024 * 10',
            absolute: false,
            alwaysIncludePattern: true,
            category: 'http',
            backups: 100
        },
        {
            type: 'dateFile',
            filename: path.resolve(__dirname + '../../../../server/logs/test/'),
            pattern: '/yyyyMMddhh.log',
            maxLogSize: '1024 * 1024 * 10',
            absolute: false,
            alwaysIncludePattern: true,
            category: 'test',
            backups: 100
        }
    ],
    replaceConsole: true,
    levels: {
        // log4js的输出级别6个: trace < debug < info < warn < error < fatal (all)
        http: 'ALL',
        test: 'DEBUG'
    }
};









