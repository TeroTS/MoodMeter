var kutsuCtrl = function ($scope, dataService, restFactory) {
    
    $scope.sposti = "";

    //kirjoita data servicen kautta persistence objektiin
    $scope.kirjoitaData = function() {
        spostiLista = $scope.sposti.split(",");
        dataService.kirjoitaData('osallistujatSposti', spostiLista);
        pollData = dataService.lueData();
        restFactory.createPoll(pollData)
            .success(function() {
                console.log("Post data success !");
            })
            .error(function(data, status, headers, config) {
                console.log("Error: " + status);
            });    
        console.log(dataService.lueData());
    };  
    
};

//kutsuCtrl.$inject = ['restFactory'];

angular.module('roodleApp').controller('kutsuCtrl', kutsuCtrl);