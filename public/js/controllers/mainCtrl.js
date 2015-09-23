app.controller('mainCtrl', function($scope, $rootScope, restFactory, dataService) {

	//$scope.user = $rootScope.user;
  $scope.isAdmin = $rootScope.user.role === 'admin';

  $scope.logout = function () {
    restFactory.logout()
      .success(function(data, status, headers, config) {
        console.log(data);
      })
        .error(function(data, status, headers, config) {
        console.log("Error: " + status);
      });
  };

});
