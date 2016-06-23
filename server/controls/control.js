'use strict';
const controls = [
    {root: '/', url: './user/user'}    // 用户模块
];

module.exports = function (app) {
    controls.forEach(function (e) {
        app.use(e.root, require(e.url))
    })
};

