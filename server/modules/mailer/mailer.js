'use strict';
const _ = require('lodash');
const config = require('../../config');
const nodemailer = require('nodemailer');
const serviceProvider = require('nodemailer-wellknown');

let smtpConfig = _.assign(serviceProvider(config.mail_opts.sp), {
    auth: {
        user: config.mail_opts.user,
        pass: config.mail_opts.pass
    }
});

let transporter = nodemailer.createTransport(smtpConfig);

let configure = {
    // 发件人帐号，要与上面的auth.user一致，否则会报501错误[ sender address mailfrom must be same with the user ]
    from: config.mail_opts.user,
    // 收件人帐号(列表以逗号分隔)[ list of receivers ]
    to: '573785073@qq.com',
    // 抄送人[ copy for receivers ]
    cc: '',
    // 副本[ secret copy for receivers ]
    bcc: '',
    // 邮件标题[ subject line ]
    subject: '<h3>邮件标题</h3>',
    // 附件，值是数组
    attachments: [],
    // 邮件内容[ plaintext body ]
    text: '',
    // 以html形式编写邮件内容[ html body ]
    html: ''
};

/*
* 模块 - 封装发送邮件
* @param {Object} opts 邮件配置
* @param {Function} cb 成功(200)或失败(1006)的回调函数，返回code
* */
function mailer(opts, cb) {
    let mailOptions = _.assign(configure, opts || {});
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('邮件发送失败：', error);
            typeof cb == 'function' && cb.call(this, 1006);
        }
        console.log('邮件发送成功: ' + info.response);
        typeof cb == 'function' && cb.call(this, 200);
    });
}

// 发送邮件模块
module.exports = mailer;
