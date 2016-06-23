'use strict';
const routes = [
    {root: '/', url: './index/index'}
];

module.exports = function (app) {
    routes.forEach(function (e) {
        app.use(e.root, require(e.url))
    })
};














