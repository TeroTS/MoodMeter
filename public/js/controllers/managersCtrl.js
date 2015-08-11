app.controller('managersCtrl', function($scope, restFactory, dataService) {

  //get all users
  restFactory.getManagers()
      .success(function(data, status, headers, config) {
          $scope.users = data;
          console.log(data);
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });

  //write data of the selected user to a persistence object
  //this object is used in other pages related to this user
  $scope.getUser = function(idx) {
      var userData = $scope.users[idx];
      dataService.writeUserData('data', userData);
  };

  $scope.deleteUser = function(idx) {
      var userData = $scope.users[idx];
      restFactory.deleteUser(userData.id)
          .success(function(data, status, headers, config) {
              console.log(data);
          })
          .error(function(data, status, headers, config) {
              console.log("Error: " + status);
          });
  }

});