var endCtrl = function ($scope, dataService, restFactory, $location) {

    $scope.stage4 = "bold";
    var pollData = dataService.readPollData();
    var baseUrl = "http://" + $location.host() + ":" + $location.port() + "/#polls/";
    $scope.pollUrl = baseUrl + pollData.pollUrl;
  
};

angular.module('roodleApp').controller('endCtrl', endCtrl);