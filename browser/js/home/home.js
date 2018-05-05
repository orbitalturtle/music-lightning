app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeController', function ($scope, HomeFactory) {

    var songPromise = HomeFactory.getSongs();
    
    songPromise.then(function(response) {
        $scope.songs = response; 
        
        // This is sort of an experimental thing I'm doing here ;-/ 
        for (var i = 0; i < $scope.songs.length; i++) {
           // $scope.songs[i].song_art = Buffer.from($scope.songs.song_art.data).toString('base64'); 
           $scope.songs[i].song_art = btoa(String.fromCharCode.apply(null, new Uint8Array($scope.songs[i].song_art.data)))
        }
    })

});

app.factory('HomeFactory', function ($http) {
    var HomeFactory = {};

    HomeFactory.getSongs = function() {
        return $http.get('/api/songs')
        .then(function(response) {
            return response.data;
        })
    }

    return HomeFactory;

});

