var kutsuCtrl = function ($scope, dataService, restFactory) {
    
    $scope.stage3 = "bold";
    $scope.sposti = "";
    
    //init address
    var initData = dataService.lueData();
    $scope.sposti = initData.osallistujatSposti; 
    
    //save address when going back
    $scope.saveEmailAddress = function() {
       dataService.kirjoitaData('osallistujatSposti', $scope.sposti.split(","));
    };

    //save poll to database
    $scope.sendPoll = function() {
        dataService.kirjoitaData('osallistujatSposti', $scope.sposti.split(","));
        pollData = dataService.lueData();
        restFactory.createPoll(pollData)
            .success(function(data, status, headers, config) {
                dataService.kirjoitaData('hallinnointiUrl', data.adminUrl);
                dataService.kirjoitaData('kyselyUrl', data.pollUrl);
            })
            .error(function(data, status, headers, config) {
                console.log("Error: " + status);
            });
    };  
    
};

angular.module('roodleApp').controller('kutsuCtrl', kutsuCtrl);