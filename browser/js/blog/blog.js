app.config(function ($stateProvider) {

    // Register the blog state.
    $stateProvider.state('blog', {
      url: '/blog',
      controller: 'BlogController',
      templateUrl: 'js/blog/blog.html',
      resolve: {
        allPosts: function(BlogFactory) {
          return BlogFactory.fetchPosts();
        }
      }
    })
    .state('post', {
      url: '/blog/:id',
      templateUrl: 'js/blog/singlePost.html',
      controller: 'PostController',
      resolve: {
        thePost: function(BlogFactory, $stateParams){
          return BlogFactory.fetchPost($stateParams.id)
        }
      }
    });

});

app.controller('BlogController', function ($scope, allPosts) {

  $scope.posts = allPosts;

});

app.controller('PostController', function ($scope, thePost) {

  $scope.post = thePost;

});
