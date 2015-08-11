app.controller('usersCtrl', function($scope, restFactory, dataService) {

  //$scope.users = [];

  //get all users
  restFactory.getUsers()
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