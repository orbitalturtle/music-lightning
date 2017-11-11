app.factory('BlogFactory', function ($http) {
  var BlogFactory = {};

  BlogFactory.fetchPosts = function() {
    return $http.get('/api/posts')
    .then(function(response) {
      return response.data;
    })
  }

  BlogFactory.fetchPost = function(id) {
    return $http.get('/api/posts/' + id)
    .then(function(response) {
      console.log('here is the single post response data', response.data)
      return response.data;
    })
  }

  return BlogFactory;

});


