'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var songSchema = new mongoose.Schema({
    title: {
        type: String
    },
    song_file: {
        type: Buffer
    },
    tags: [{
        type: String
    }],
    price: {
        type: Number    
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    song_art: { 
        type: Buffer 
    }
});

songSchema.statics.retrieveSongsByTag = function(tag) {
    return this.find({
        tags: { $in: [tag] }
    })
    .then(function(songs) {
        return songs;
    })
}

mongoose.model('Song', songSchema);

