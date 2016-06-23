'use strict';
let _ = require('lodash');

/*
 * Handle类，统一处理消息反馈
 * @param1 {String} msg 提示信息
 * @param2 {Array} data 数据集合
 * @param {Object} option 配置信息
 * */
class Handle {
    constructor() {
        this.param = {
            code: 0,
            data: [],
            msg: ''
        };
    }

    message() {
        if (arguments.length == 1 && typeof arguments[0] == 'string') {
            this.param.msg = arguments[0];
        }
        if (arguments.length == 2) {
            this.param.msg = arguments[0];
            this.param.data = arguments[1];
        }
        if (typeof arguments[0] == 'object') {
            this.param = _.assign({}, this.param, arguments[0]);
        }
        return this.param;
    }
}

/*
 * 统一处理错误信息
 *
 * */
class Error extends Handle {
    constructor() {
        super()
        this.param.code = 9001;
    }
}

/*
 * 统一处理成功信息
 *
 * */
class Success extends Handle {
    constructor() {
        super()
        this.param.code = 200;
    }
}

module.exports = {
    error: new Error(),
    success: new Success()
};

