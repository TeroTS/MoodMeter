app.controller('viewUserDataCtrl', function($scope, $rootScope, $filter, restFactory, dataService) {

	  $scope.home = "nonactive";
	  $scope.account = "nonactive";
	  $scope.dashboard = "active";
	  $scope.user = $rootScope.user;
	  //$scope.isManager = ($rootScope.user.role === "manager" || $rootScope.user.role === "admin");

	  //read user data from persistent object
      $scope.userData = dataService.readUserData('data');
      //console.log();

	  $scope.labels = [];
	  $scope.data = [[]];

	  $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	  };

	  $scope.timeOptions = ['1 week', '1 month', '3 months'];
	  $scope.selectedItem = '1 week';

	  // get selected time period user data
	  $scope.getPeriodData = function(period) {

		  var userId = $scope.userData.id;

		  if (period !== '') {
			  restFactory.getData(userId, period)
		      .success(function(data, status) {
		    	  $scope.data[0] = data.data;
		    	  $scope.labels = [];
		    	  for (var i = 0; i < data.dates.length; i++) {
		    		  $scope.labels.push($filter('date')(data.dates[i], "shortDate"));
		    	  }
		    	  //console.log($scope.data[0]);
		    	  //console.log($scope.labels);
		      })
		      .error(function() {console.log('User data GET failed !');});
		  }
	  };

      // get default time period of 1 week
	  $scope.getPeriodData('1 week');

});