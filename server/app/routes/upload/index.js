'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
// var Song = mongoose.model('Song');

// Upload the song
router.post('/', function(req, res) {
  Song.create() // is this the right mongoose method to use?
  .then(function(song) {
     res.json(song);
  })
});
