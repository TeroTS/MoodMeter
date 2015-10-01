app.controller('dashboardCtrl', function($scope, getCounts) {

	// get counts of users, managers and admins
	var data = getCounts.data;
	$scope.numberOf = {users: data.users, managers: data.managers, admin: data.admins};

});