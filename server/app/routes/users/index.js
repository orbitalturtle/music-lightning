'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

router.use('/users', require('./users.js'));
