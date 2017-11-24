'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Song = mongoose.model('Song');

// Get all the songs
router.get('/', function(req, res) {
    Song.find()
    .then(function(songs) {
        res.json(songs);
    })
});

// Get a single song
router.get('/:id', function(req, res) {
    Song.findById(req.params.id)
    .then(function(song) {
        res.json(song);
    })
});

// Get songs with this tag
router.get('/tags/:tag', function(req, res) {
    Song.retrieveSongsByTag(req.params.tag)
    .then(function(songs) {
        res.json(songs);
    })
});
