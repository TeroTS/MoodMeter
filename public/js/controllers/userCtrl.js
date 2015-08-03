app.controller('userCtrl', function($scope, restFactory, dataService) {

    //read user data from persistent object
    var user = dataService.readUserData('data');
    //console.log(user);
    $scope.name = user.name;//dataService.readUserData();
    //$scope.managers = [{name :'manager1'}, {name: 'manager2'}];
    $scope.myManager = {name : ''};
    $scope.isManager = false;
    //is user manager ?
    var userRole = 'user';
    //console.log($scope.isManager);
    //if ($scope.isManager === true) {
    //  userRole = 'manager';
    //}

    //get all managers
    restFactory.getManagers()
      .success(function(data, status, headers, config) {
          $scope.managers = data; //[{name: 'manager1'}, {name: 'manager2'}];//data;
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });

    //update manager name
    $scope.updateUser = function() {
      if ($scope.isManager === true) {
        userRole = 'manager';
      }
      //console.log($scope.myManager.name);
      restFactory.updateUser(user.id, {role: userRole, manager: $scope.myManager.name})
      .success(function(data, status, headers, config) {
          $scope.user = data;
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });
    };

});