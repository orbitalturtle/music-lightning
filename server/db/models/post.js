'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    tags: [{
        type: String
    }],
    date: { 
        type: Date, 
        default: Date.now 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

postSchema.statics.retrievePostsByTag = function(tag) {
    return this.find({
        tags: { $in: [tag] }
    })
    .then(function(posts) {
        return posts;
    })
}

mongoose.model('Post', postSchema);

