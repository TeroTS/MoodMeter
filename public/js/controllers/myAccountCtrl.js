app.controller('myAccountCtrl', function($scope, $rootScope, $filter, restFactory) {

	  $scope.labels = [];
	  $scope.data = [[]];

	  $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	  };

	  $scope.timeOptions = ['1 week', '1 month', '3 months'];
	  $scope.selectedItem = '1 week';

	  // get selected time period user data
	  $scope.getPeriodData = function(period) {

		  var userId = $rootScope.user.id;
//		  if ($scope.adminViewingData) {
//		  	userId = user.id;
//		  }

		  if (period !== '') {
			  restFactory.getData(userId, period)
		      .success(function(data, status) {
		    	  $scope.data[0] = data.data;
		    	  $scope.labels = [];
		    	  for (var i = 0; i < data.dates.length; i++) {
		    		  $scope.labels.push($filter('date')(data.dates[i], "shortDate"));
		    	  }
		    	  console.log($scope.data[0]);
		    	  console.log($scope.labels);
		      })
		      .error(function() {console.log('User data GET failed !');});
		  }
	  };

      // get default time period of 1 week
	  $scope.getPeriodData('1 week');

});