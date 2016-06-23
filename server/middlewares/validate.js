'use strict';
const handle = require('../utils/handle/handle');


/*
 * 中间件 - 验证注册用户账号
 * @explain 主要验证字段 { account password }
 * */
exports.verifyRegister = function (req, res, next) {
    req.checkBody({
        account: {
            notEmpty: {
                errorMessage: '用户名不能为空'
            },
            isLength: {
                options: [{min: 6, max: 16}],
                errorMessage: '账户必须是6~16位的字符'
            }
        },
        password: {
            notEmpty: {
                errorMessage: '密码不能为空'
            },
            isLength: {
                options: [{min: 6}],
                errorMessage: '密码必须是大于6位的字符'
            }
        }
    });
    let errors = req.validationErrors();
    if (errors) {
        return res.json(handle.error.message(errors[0].msg));
    }
    next();
};

/*
 * 中间件 - 分页获取用户信息
 * @explain 主要验证字段 { pageSize pageIndex }
 * */
exports.verifyUserInfo = function (req, res, next) {
    req.checkBody({
        pageSize: {
            notEmpty: {
                errorMessage: '参数pageSize不能为空'
            },
            isLength: {
                options: [{min: 1}],
                errorMessage: '参数pageSize最小不能低于1'
            }
        },
        pageIndex: {
            notEmpty: {
                errorMessage: '参数pageIndex不能为空'
            },
            isLength: {
                options: [{min: 1}],
                errorMessage: '参数pageSize最小不能低于1'
            }
        }
    });
    let errors = req.validationErrors();
    if (errors) {
        return res.json(handle.error.message(errors[0].msg));
    }
    next();
};







