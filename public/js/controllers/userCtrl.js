app.controller('userCtrl', function($scope, restFactory, dataService) {
    
    $scope.userData = dataService.readUserData();
    

});