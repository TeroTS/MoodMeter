app.controller('myAccountCtrl', function($scope) {
	
	  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	  //$scope.series = [];
	  
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, 40]
	  ];
	  
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

	  $scope.status = {
	    isopen: false
      };

});