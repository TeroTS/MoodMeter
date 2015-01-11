var dataService = function() {
    
    
    pollData = {
        title: "",
        location: "",
        description: "",
        creatorName: "",
        dates: [],
        participantEmails: "",
        participants: [],
        pollUrl: ""
    };
    
    this.writePollData = function(prop, data) {      
        pollData[prop] = data; 
    };
    
    this.readPollData = function() {
        return pollData;
    };
       
};

angular.module('roodleApp').service('dataService', dataService);