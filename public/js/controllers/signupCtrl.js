app.controller('signupCtrl', function($scope, $http, $location) {

  //$scope.user = $rootScope.user;
  // This object will be filled by the form
  $scope.userData = {};

  // Register the login() function
  $scope.signup = function() {
    $http.post('/signup', {
      email: $scope.userData.email,
      password: $scope.userData.password,
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