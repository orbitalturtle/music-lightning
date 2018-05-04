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

