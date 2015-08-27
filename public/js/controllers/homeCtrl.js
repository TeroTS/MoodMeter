app.controller('homeCtrl', function($scope, $rootScope, restFactory, dataService) {

  $scope.home = "active";
  $scope.account = "nonactive";
  $scope.dashboard = "nonactive";

  $scope.rate = 5;
  $scope.max = 10;
  $scope.isReadonly = false;
  $scope.isManager = ($rootScope.user.role === "manager");

  //remove user data cookie, just to be sure
  dataService.deleteUserData('data');

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  //
  $scope.postData = function() {
	  var userId = $rootScope.user.id;
	  //create object for backend json parser
	  var valueObject = {"value" : $scope.rate};
      restFactory.postData(userId, valueObject)
          .success(function(data, status, headers, config) {
        	  console.log("Data post success !");
          })
          .error(function(data, status, headers, config) {
              console.log("Error: " + status);
          });
  };


/*  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];*/

});