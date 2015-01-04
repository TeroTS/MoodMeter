var pollCtrl = function ($scope, $routeParams, dataService, restFactory) {
    
    $scope.users = [];
    $scope.newUser = {};
    
    console.log($routeParams.pollId);
    restFactory.getPoll($routeParams.pollId)
        .success(function(data, status, headers, config) {
            //dataService.kirjoitaData('hallinnointiUrl', data.title);
            //dataService.kirjoitaData('kyselyUrl', data.pollUrl);
            $scope.poll = data;
            
        })
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });
        
    $scope.saveData = function() {
        console.log($scope.newUser);
        $scope.users.push($scope.newUser); //{'name': $scope.name, 'dates': $scope.dates});
        $scope.newUser = {};
        console.log($scope.users);
    };
  
};

angular.module('roodleApp').controller('pollCtrl', pollCtrl);