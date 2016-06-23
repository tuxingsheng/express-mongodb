'use strict';
const path = require('path');
const glob = require('glob');

module.exports = function (gb, o, n, t) {
    var gbs = glob.sync(gb), d, a, x
        , fs = {
        url: [], dist: [], name: []
    };
    gbs.forEach(function (e) {
        x = path.extname(e);
        if (t) {
            e = e.replace(x, t);
            x = path.extname(e);
        }
        d = e.replace(o, n);
        a = path.basename(e, x);
        fs.url.push(e);
        fs.dist.push(d);
        fs.name.push(a);
    });
    return fs;
};
