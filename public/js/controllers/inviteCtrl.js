var inviteCtrl = function ($scope, dataService, restFactory) {
    
    $scope.stage3 = "bold";
    $scope.emailAddress = "";
    
    //init address
    var initData = dataService.readPollData();
    $scope.emailAddress = initData.participantEmails; 
    
    //save address when going back
    $scope.saveEmailAddress = function() {
       dataService.writePollData('participantEmails', $scope.emailAddress);
    };

    //save poll to database
    $scope.sendPoll = function() {
        dataService.writePollData('participantEmails', $scope.emailAddress);
        var pollData = dataService.readPollData();
        restFactory.createPoll(pollData)
            .success(function(data, status, headers, config) {
                dataService.writePollData('pollUrl', data.pollUrl);
            })
            .error(function(data, status, headers, config) {
                console.log("Error: " + status);
            });
    };  
    
};

angular.module('roodleApp').controller('inviteCtrl', inviteCtrl);