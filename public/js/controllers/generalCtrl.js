var generalCtrl = function ($http) {
    
	  $scope.logout = function() {
		  $http.post('/logout');
	  };

};

angular.module('roodleApp').controller('generalCtrl', generalCtrl);
    
