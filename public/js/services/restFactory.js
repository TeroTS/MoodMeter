var restFactory = function($http) {

    var factory = {};
    
    factory.postData = function(id, data) {
        return $http.post('/users/' + id + '/data', data);
    };      
    
/*    factory.createPoll = function(data) {
        return $http.post('/rest/polls', data);
    };
    
    factory.updatePoll = function(pollId, data) {
        return $http.put('/rest/polls/' + pollId, data);
    };
    
    factory.deletePoll = function(pollId) {
        return $http.delete('/rest/polls/' + pollId);
    };*/
    
    return factory;
};
    
angular.module('roodleApp').factory('restFactory', restFactory);