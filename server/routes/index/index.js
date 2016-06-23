'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login/login', {
        name: 'login'
    });
});

module.exports = router;


