app.controller('homeCtrl', function($scope, $rootScope, restFactory, dataService) {

    $scope.rate = 5;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.alerts = [];

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.postData = function() {
  	  var userId = $rootScope.user.id;
  	  var valueObject = {"value" : $scope.rate};
      restFactory.postData(userId, valueObject).then(function(response) {$scope.alerts.push({type: 'success', msg: 'Data sent succesfully !'});});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});