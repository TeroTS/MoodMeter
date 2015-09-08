app.controller('userCtrl', function($scope, $rootScope, restFactory, dataService) {

    $scope.home = "nonactive";
    $scope.account = "nonactive";
    $scope.dashboard = "active";
    $scope.user = $rootScope.user;

    //read user data from persistent object
    var user = dataService.readUserData('data');
    var userRole = user.role;

    $scope.name = user.name;
    $scope.myManagerName = user.managerName;
    $scope.myManager = {};

    if (userRole === 'manager')
      $scope.isUserManager = true;
    else
      $scope.isUserManager = false;

    //get all managers for drop down selection
    restFactory.getManagers()
      .success(function(data, status, headers, config) {
          $scope.managers = data;
          //select correct manager object from return data and set it to model
          for (var i = 0; i < data.length; i++) {
              if (data[i].name === $scope.myManagerName)
                  $scope.myManager = data[i];
          }
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });

    //update user data
    $scope.updateUser = function() {
      if ($scope.isUserManager === true) {
        userRole = 'manager';
        $scope.myManager.name = "";
      }
      restFactory.updateUser(user.id, {role: userRole, manager: $scope.myManager.name})
      .success(function(data, status, headers, config) {
          $scope.user = data;
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });
    };

});