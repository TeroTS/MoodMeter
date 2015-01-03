var loppuCtrl = function ($scope, dataService, restFactory, $location) {

    $scope.stage4 = "bold";
    var pollData = dataService.lueData();
    //$scope.pollPath = pollData.kyselyUrl;
    //$scope.pollAdminPath = pollData.hallinnointiUrl;
    //$scope.location = $location;
    var baseUrl = "http://" + $location.host() + ":" + $location.port() + "/#polls/";
    $scope.pollUrl = baseUrl + pollData.kyselyUrl;
    $scope.adminUrl = baseUrl + pollData.hallinnointiUrl;
  
};

angular.module('roodleApp').controller('loppuCtrl', loppuCtrl);