var pollCtrl = function ($scope, $routeParams, dataService, restFactory) {

    console.log($routeParams.pollId);
    restFactory.getPoll($routeParams.pollId)
        .success(function(data, status, headers, config) {
            //dataService.kirjoitaData('hallinnointiUrl', data.title);
            //dataService.kirjoitaData('kyselyUrl', data.pollUrl);
            $scope.title = data.title;
            
        })
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });
  
};

angular.module('roodleApp').controller('pollCtrl', pollCtrl);