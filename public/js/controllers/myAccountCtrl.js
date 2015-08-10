app.controller('myAccountCtrl', function($scope, $rootScope, $filter, restFactory, dataService) {

	  //read user data from persistent object
      var user = dataService.readUserData('data');
      console.log(user);

	  $scope.labels = [];
	  $scope.data = [[]];
	  
	  $scope.onClick = function (points, evt) {
	      console.log(points, evt);
	  };
	  
	  $scope.timeOptions = ['1 week', '1 month', '3 months', '6 months'];  
	  $scope.selectedItem = '1 week';
	  
	  // get selected time period user data
	  $scope.getPeriodData = function(userId, period) {
		  if (period != '') {
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
		      .error(function() {console.log('User data GET failed !')});
		  }
	  };

	  // is user or manager/admin viewing data ?
	  // depending on who is viewing data, the user id is taken either from logged in user (user viewing his own data) or
	  // from user data saved in session earlier (manager/admin viewing data)
	  var adminViewingData = (typeof user != 'undefined')

	  var userId = $rootScope.user.id;
	  if (adminViewingData) {
	  	userId = user.id;
	  }

      // get default time period of 1 week
	  $scope.getPeriodData(userId, '1 week');

});