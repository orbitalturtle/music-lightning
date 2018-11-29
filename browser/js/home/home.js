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
        
        for (var i = 0; i < $scope.songs.length; i++) {
           $scope.songs[i].song_art = btoa(String.fromCharCode.apply(null, new Uint8Array($scope.songs[i].song_art.data)));

           var base64File = btoa(arrayBufferToString($scope.songs[i].song_file.data));

           $scope.songs[i].song_file = base64File;
        }
    })

    function arrayBufferToString(buffer){

        var bufView = new Uint16Array(buffer);
        var length = bufView.length;
        var result = '';
        var addition = Math.pow(2,16)-1;

        for(var i = 0;i<length;i+=addition){

            if(i + addition > length){
                addition = length - i;
            }
            result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
        }

        return result;
    }

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

