app.controller('viewUserDataCtrl', function($scope, $stateParams, $filter, restFactory, dataService) {

	  $scope.userFromList = dataService.readUserData('data'); //$scope.users[$stateParams.id];
	  console.log($scope.user);

	  $scope.labels = [];
	  $scope.data = [[]];

	  $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	  };

	  $scope.timeOptions = ['1 week', '1 month', '3 months'];
	  $scope.selectedItem = '1 week';

	  // get selected time period user data
	  $scope.getPeriodData = function(period) {

		  if (period !== '') {
			  restFactory.getData($scope.userFromList.id, period)
		      .success(function(data, status) {
		    	  $scope.data[0] = data.data;
		    	  $scope.labels = [];
		    	  for (var i = 0; i < data.dates.length; i++) {
		    		  $scope.labels.push($filter('date')(data.dates[i], "shortDate"));
		    	  }
		      })
		      .error(function() {console.log('User data GET failed !');});
		  }
	  };

      // get default time period of 1 week
	  $scope.getPeriodData('1 week');

});