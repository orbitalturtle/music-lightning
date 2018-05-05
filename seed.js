/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Song = Promise.promisifyAll(mongoose.model('Song'));
var fs = require('fs');

var seedSongs = function () {
    try {
        var songData = fs.readFileSync('seedData/songs/luca.mp3'); 
    } catch(e) {
        console.log("Reading song data error= ", e.stack); 
    }

    try {
        var albumData = fs.readFileSync('seedData/albumArt/luca_chamorro.jpg'); 
    } catch(e) {
        console.log("Reading album art data error= ", e.stack); 
    }

    var songs = [
    {
        title: "Ratonera",
        song_file: songData,
        song_art: albumData,
        tags: ["experimental"],
        price: 0.0000001
    }
    ];

    console.log("songs= ", songs);

    return Song.createAsync(songs);
};

connectToDb.then(function () {
    Song.findAsync({}).then(function (songs) {
        if (songs.length === 0) {
            return seedSongs();
        } else {
            console.log(chalk.magenta('Seems to already be song data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
