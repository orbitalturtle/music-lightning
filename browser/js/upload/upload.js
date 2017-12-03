app.config(function ($stateProvider) {

    // Register our *upload* state.
    $stateProvider.state('upload', {
        url: '/upload',
        controller: 'UploadController',
        templateUrl: 'js/upload/upload.html'
    });

});

app.controller('UploadController', function ($scope, UploadFactory) {

    // Post a song to the website.
    $scope.submit = function() {
        var songData = {
            title: $scope.title,
            song_file: $scope.musicFile,
            tags: $scope.tags,
            price: $scope.price,
            song_art: $scope_songArt
        }
        UploadFactory.uploadSong(songData); 
    }
    
});

app.factory('UploadFactory', function ($http) {
    var UploadFactory = {};

    UploadFactory.uploadSong = function(songData) {
        return $http.post('/api/upload', songData)
        .then(function(response) {
            return response.data;
        })
    }

    return UploadFactory;

});


