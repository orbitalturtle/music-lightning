var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Song = Promise.promisifyAll(mongoose.model('Song'));
var fs = require('fs');

var fakeSongs = [
    {
        title: "Ratonera",
        tags: ["experimental"],
        price: 0.0000001
    },
    {
        title: "Simba",
        tags: ["experimental"],
        price: 0.0000001
    },
    {
        title: "Experimental noise thing",
        tags: ["experimental"],
        price: 0.0000001
    }
];

var seedSongs = function () {

       var songs = fs.readdirSync('seedData/songs/');
       var albumArt =  fs.readdirSync('seedData/albumArt/');

       for (var i = 0; i < fakeSongs.length; i++) {
           fakeSong = fakeSongs[i];

           try {
                fakeSong.song_file = fs.readFileSync('seedData/songs/' + songs[i]); 
            } catch(e) {
                console.log("Reading song data error= ", e.stack); 
            }

            try {
                 fakeSong.song_art = fs.readFileSync('seedData/albumArt/' + albumArt[i]); 
            } catch(e) {
                 console.log("Reading album art data error= ", e.stack); 
            }

            fakeSongs[i] = fakeSong;
       } 

       return Song.createAsync(fakeSongs);
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
