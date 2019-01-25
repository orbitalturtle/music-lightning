'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

//Create a new account/user
router.post('/', function(req, res, next) {
        console.log("Getting to the route?");

	mongoose.model('User').create(req.body)
	.then(function(newUser) {
		res.json(newUser)
	})
	.then(null, function(err) {
            console.log(err)
  	})
})
