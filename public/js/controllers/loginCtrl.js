app.controller('loginCtrl', function($scope, $http, $location) {

  // Register the login() function
  $scope.login = function() {
      $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
      })
          .success(function(user) {
            // No error: authentication OK
            console.log('Authentication successful!');
            $location.url('/dashboard');
          })
          .error(function(data) {
            // Error: authentication failed
            console.log(data);
            console.log('Authentication failed.');
            $location.url('/login');
          });
  };

});