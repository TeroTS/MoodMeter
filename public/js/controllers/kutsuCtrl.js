var kutsuCtrl = function ($scope, dataService, restFactory) {
    
    $scope.stage3 = "bold";
    $scope.sposti = "";

    //kirjoita data servicen kautta persistence objektiin
    $scope.kirjoitaData = function() {
        spostiLista = $scope.sposti.split(",");
        dataService.kirjoitaData('osallistujatSposti', spostiLista);
        pollData = dataService.lueData();
        restFactory.createPoll(pollData)
            .success(function(data, status, headers, config) {
                dataService.kirjoitaData('hallinnointiUrl', data.adminUrl);
                dataService.kirjoitaData('kyselyUrl', data.pollUrl);
                //console.log(data.adminUrl);
                //console.log(data.pollUrl);
            })
            .error(function(data, status, headers, config) {
                console.log("Error: " + status);
            });    
        console.log(dataService.lueData());
    };  
    
};

//kutsuCtrl.$inject = ['restFactory'];

angular.module('roodleApp').controller('kutsuCtrl', kutsuCtrl);