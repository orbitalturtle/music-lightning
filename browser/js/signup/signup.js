'use strict';

app.config(function ($stateProvider) {

    console.log("MEH"); 

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, SignupFactory, AuthService, $state) {

    console.log("Getting here..."); 

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        SignupFactory.signup(signupInfo)
        .then(function (response) {

                console.log("Here's the signup response! ", response);

                AuthService.login(signupInfo).then(function () {
                    $state.go('home');
                }).catch(function () {
                    $scope.error = 'Invalid login credentials.';
                });
         })

    };

});

app.factory('SignupFactory', function ($http) {
   var SignupFactory = {};

   SignupFactory.signup = function(signupData) {
       return $http.post('/api/users/users', signupData)
       .then(function(response) {
           return response.data;
       })
   }

   return SignupFactory;

});
