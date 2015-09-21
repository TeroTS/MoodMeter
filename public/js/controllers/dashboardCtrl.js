app.controller('dashboardCtrl', function($scope, $rootScope, restFactory, dataService) {

	//get all users
	restFactory.getUsers()
	  	.success(function(data, status, headers, config) {
	      	$scope.users = data;
	      	console.log(data);
	 	})
	  	.error(function(data, status, headers, config) {
	      	console.log("Error: " + status);
	  	});

	$scope.hideUsers = true;
	$scope.hidePanel = function() {
		if ($scope.hideUsers)
	  		$scope.hideUsers = false;
	  	else
	  		$scope.hideUsers = true;
	};

	restFactory.getCounts()
	    .success(function(data, status, headers, config) {
	        $scope.numberOf = {users: data.users, managers: data.managers, admin: data.admins};
	    })
	    .error(function(data, status, headers, config) {
	        console.log("Error: " + status);
	    });

});