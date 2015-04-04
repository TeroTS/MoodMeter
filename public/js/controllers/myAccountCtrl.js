app.controller('myAccountCtrl', function($scope, $rootScope, $filter, restFactory) {
	
	  $scope.labels = [];
	  $scope.data = [[]];
	  
	  $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	  };
	  
	  $scope.items = ['1 week', '1 month', '3 months', '6 months'];
	  
	  $scope.selectedItem = '';
	  
	  // get selected time period user data
	  $scope.getPeriodData = function() {
	      var userId = $rootScope.user.id;
		  var period = $scope.selectedItem;
		  if (period != '') {
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
		      .error(function() {console.log('User data GET failed !')});
		  }
	  };

});