app.controller('signupCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.signup = function() {
    $http.post('/signup', {
      email: $scope.user.email,
      password: $scope.user.password,
    })
    .success(function(user) {
      // No error: authentication OK
      console.log('Admin created !');
      $location.url('/login');
    })
    .error(function() {
      // Error: authentication failed
      console.log('Signup failed.');
      $location.url('/signup');
    });
  };
  
});