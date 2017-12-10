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
        console.log("scope in the submit function= ", $scope.musicFile);
        var songData = {
            title: $scope.title,
            song_file: $scope.musicFile,
            tags: $scope.tags,
            price: $scope.price,
            song_art: $scope.songArt
        }
        UploadFactory.uploadSong(songData); 
    }
    
});

app.factory('UploadFactory', function ($http) {
    var UploadFactory = {};

    UploadFactory.uploadSong = function(songData) {
        return $http.post('/api/upload', songData)
        .then(function(response) {
            console.log("response= ", response);
            return response.data;
        })
    }

    return UploadFactory;

});

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
