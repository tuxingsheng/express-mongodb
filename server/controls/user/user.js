'use strict';
const express = require('express');
const router = express.Router();
const userMiddleware = require('../../middlewares/user/user');
const verifyMiddleware = require('../../middlewares/validate');

/*
 * 添加用户信息
 * */
router.post('/addUserInfo', verifyMiddleware.verifyRegister, userMiddleware.addAccount);
/*
 * 分页获取用户信息
 * */
router.post('/getUserInfo', verifyMiddleware.verifyUserInfo, userMiddleware.getAccount);

module.exports = router;
