app.controller('myAccountCtrl', function($scope, $state, $rootScope, $filter, restFactory, dataService) {

	$scope.labels = [];
	$scope.data = [[]];
	$scope.timeOptions = ['1 week', '1 month', '3 months'];
	$scope.selectedItem = '1 week';

	// if admin/manager viewing user data, take user from cookiestore
	if ($state.$current.name === 'main.dashboard.viewUserData') {
		$scope.user = dataService.readUserData('data');
		$scope.isAdmin = true;
	} else {
		$scope.user = $rootScope.user;
		$scope.isAdmin = false;
	}

	$scope.onClick = function (points, evt) {
	    console.log(points, evt);
	};

	// get selected time period user data
	$scope.getPeriodData = function(period) {
		if (period !== '') {
			restFactory.getData($scope.user.id, period)
			  	.then(function(response) {
					$scope.data[0] = response.data.data;
					$scope.labels = [];
					for (var i = 0; i < response.data.dates.length; i++) {
					  	$scope.labels.push($filter('date')(response.data.dates[i], "shortDate"));
					}
				});
		}
	};

    // get default time period of 1 week
	$scope.getPeriodData('1 week');

});