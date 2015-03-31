app.controller('homeCtrl', function($scope, $rootScope, restFactory) {
    
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };
  
  userId = $rootScope.user.id;
  
  // 
  $scope.postData = function() {
      restFactory.postData(userId, $scope.rate)
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

    
