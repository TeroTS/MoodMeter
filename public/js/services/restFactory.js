var restFactory = function($http) {

    var factory = {};
    
    factory.getPoll = function(pollId) {
        return $http.get('/rest/polls/' + pollId);
    };      
    
    factory.createPoll = function(data) {
        return $http.post('/rest/polls', data);
    };
    
    factory.updatePoll = function(pollId, data) {
        return $http.put('/rest/polls/' + pollId, data);
    };
    
    factory.deletePoll = function(pollId) {
        return $http.delete('/rest/polls/' + pollId);
    };
    
    return factory;
};
    
angular.module('roodleApp').factory('restFactory', restFactory);