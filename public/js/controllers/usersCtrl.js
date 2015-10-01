app.controller('usersCtrl', function($scope, dataService, getUsers) {

  	//get all users
  	$scope.users = getUsers.data;

    //write data of the selected user to a persistence object
    //this object is used in other pages related to this user
    $scope.getUser = function(idx) {
        var userData = $scope.users[idx];
        dataService.writeUserData('data', userData);
    };

});