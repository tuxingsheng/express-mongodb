'use strict';
const _ = require('lodash');
const User = require('../../models/user/user');
const handle = require('../../utils/handle/handle');

/*
 * 中间件 - 添加注册账户
 * */
exports.addAccount = function (req, res) {
    User.create({
        account: req.body.account,
        password: req.body.password
    }, function (err, docs) {
        if (err) {
            res.json(handle.error.message('添加失败'));
        }
        res.json(handle.success.message('添加成功', docs));
    });
};

/*
 * 中间件 - 获取用户信息
 * */
exports.getAccount = function (req, res, next) {
    let queryCount = User.find({}),
        queryInfo = User.find({}),
        paging = {
            list: [],
            pageSize: _.parseInt(req.body.pageSize),
            pageIndex: _.parseInt(req.body.pageIndex),
            total: 0
        };
    queryCount.count(function (err, count) {
        if (err) {
            res.json(handle.error.message('获取用户总数失败'));
        }
        paging.total = count;
    });
    queryInfo
        .skip((paging.pageIndex - 1) * paging.pageSize)
        .limit(paging.pageSize)
        .where('age').gt(17).lt(66)   // 查询年龄范围在17~66岁
        .exec(function (err, docs) {
            if (err) {
                res.json(handle.error.message('获取用户信息失败'));
            }
            paging.list = docs;
            res.json(handle.success.message('获取用户信息成功', paging));
        })
};


