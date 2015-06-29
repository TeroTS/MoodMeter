app.controller('usersCtrl', function($scope, restFactory, dataService) {

  //$scope.users = [];
  
  //get all users 
  restFactory.getUsers()
      .success(function(data, status, headers, config) {
          $scope.users = data;
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });
      
  //write data of the selected user to a persistence object
  //this object is used in other pages related to this user
  $scope.getUser = function(idx) {
      var userData =  $scope.users[idx];
      for (var prop in userData) {
          dataService.writeUserData(prop, userData[prop]);
      }
      /*restFactory.getUser(idx)
          .success(function(data, status, headers, config) {
              $scope.user = data;
          })
          .error(function(data, status, headers, config) {
              console.log("Error: " + status);
          });  */    
 /*     for (var prop in dataService.userData) {  
          dataService.writeUserData(prop, userData[prop]);
      } */
  }; 
  
});