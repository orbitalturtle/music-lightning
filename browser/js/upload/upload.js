app.config(function ($stateProvider) {

    // Register our *upload* state.
    $stateProvider.state('upload', {
        url: '/upload',
        controller: 'UploadController',
        templateUrl: 'js/upload/upload.html'
    });

});

app.controller('UploadController', function ($scope) {

    // Images of beautiful Fullstack people.
    // $scope.images = _.shuffle(FullstackPics);

});



