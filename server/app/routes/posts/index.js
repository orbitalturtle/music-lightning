'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Post = mongoose.model('Post')

// Get all of the posts
router.get('/', function(req, res) {
  Post.find()
  .then(function(posts) {
    res.json(posts);
  })
});

// Get a single post
router.get('/:id', function(req, res) {
  Post.findById(req.params.id)
  .then(function(post) {
    res.json(post);
  })
});

// Get posts with this tag
router.get('/tags/:tag', function(req, res) {
  Post.retrievePostsByTag(req.params.tag)
  .then(function(posts) {
    console.log('here are the resulting posts: ', posts);
    res.json(posts);
  })
})







