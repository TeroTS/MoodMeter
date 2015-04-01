app.controller('myAccountCtrl', function($scope, $rootScope, restFactory) {
	
	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  //$scope.series = [];
	  
	  $scope.data = [
	      [65, 59, 80, 81, 56, 55, 40]
	  ];
	  
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
		      .success(function() {})
		      .error(function() {console.log('User data GET failed !')});
		  }
	  };

});