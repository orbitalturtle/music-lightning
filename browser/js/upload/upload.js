app.config(function ($stateProvider) {

    // Register our *upload* state.
    $stateProvider.state('upload', {
        url: '/upload',
        controller: 'UploadController',
        templateUrl: 'js/upload/upload.html',
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
   
    var invoicePromise = UploadFactory.newInvoice();
    
    invoicePromise.then(function(response) {
        $scope.invoice = response; 

    }).then(function(response) {
        var getInvoicePromise = UploadFactory.getInvoice($scope.invoice);
        console.log("SCOPE INVOICE= ", $scope.invoice);

        getInvoicePromise.then(function(secondResponse) {
            console.log("WHAT THE FUCK IS THE SECONDRESPONSE ", secondResponse);

            $scope.invoiceData = secondResponse.settled;
            console.log("$scope.invoiceData= ", $scope.invoiceData);
        })
 
    })

});

app.factory('UploadFactory', function ($http) {
    var UploadFactory = {};

    UploadFactory.uploadSong = function(songData) {
        return $http.post('/api/upload', songData)
        .then(function(response) {
            return response.data;
        })
    }

    UploadFactory.newInvoice = function() {
         return $http.get('/api/upload')
         .then(function(response) {
            return response.data;
         })
    }

    UploadFactory.getInvoice = function(invoiceStr) {
         return $http.get('/api/upload/getInvoice/' + invoiceStr)
         .then(function(response) {
            console.log("IS IT GETTING THE INVOICE LOLZ");
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
