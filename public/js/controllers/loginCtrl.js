app.controller('loginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function() {
    $http.post('/login', {
      email: $scope.user.email,
      password: $scope.user.password,
    })
    .success(function(user) {
      // No error: authentication OK
      console.log('Authentication successful!');
      $location.url('/dashboard');
    })
    .error(function() {
      // Error: authentication failed
      console.log('Authentication failed.');
      $location.url('/login');
    });
  };
  
});