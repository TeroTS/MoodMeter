app.controller('dashboardCtrl', function($scope, $rootScope, restFactory, dataService) {

	$scope.hideUsers = true;  //not used currently !!!!!

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