app.controller('adminsCtrl', function($scope, restFactory, dataService) {

  $scope.header = 'Admins';
  $scope.isAdmin = true;

  //get all users
  restFactory.getAdmins()
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
      restFactory.deleteAdmin(userData.email)
          .success(function(data, status, headers, config) {
              console.log(data);
          })
          .error(function(data, status, headers, config) {
              console.log("Error: " + status);
          });
  };

});