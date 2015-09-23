app.controller('userCtrl', function($scope, $stateParams, $state, $modal, restFactory, dataService) {

    var user = dataService.readUserData('data'); //$scope.users[$stateParams.id];
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

    //delete user data
    var deleteUser = function() {
        //var userData = $scope.users[idx];
        restFactory.deleteUser(user.id)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log("Error: " + status);
            });
    };

    //delete button modal control
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: './views/templates/modal.html',
            controller: 'modalWindowCtrl',
            size: size,
        });
        modalInstance.result.then(function () {
            deleteUser();
            $state.go('main.dashboard.users');
        }, function () {});
    };

});