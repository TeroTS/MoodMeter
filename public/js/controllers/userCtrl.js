app.controller('userCtrl', function($scope, restFactory, dataService) {
    
    //read user data from persistent object
    $scope.userData = dataService.readUserData();
    
    //get all managers
    restFactory.getManagers()
      .success(function(data, status, headers, config) {
          $scope.managers = data;
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });    
    

});