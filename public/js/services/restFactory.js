    var restFactory = function($http) {
    
        var factory = {};
        
        factory.getPoll = function(pollId) {
            return $http.get('/rest/polls/' + pollId);
        };
        
        factory.createPoll = function(data) {
            return $http.post('/rest/polls', data);
        };
        
        factory.updatePoll = function(data) {
            return $http.put('/rest/polls', data);
        };
        
        factory.deletepoll = function(pollId) {
            return $http.delete('/rest/polls/' + pollId);
        };
        
        return factory;
    };
    
    //restFactory.$inject = ['$http'];
        
    angular.module('roodleApp').factory('restFactory', restFactory);
    
   /* angular.module('roodleApp').factory('restFactory', function ($http) { 
        var factory = {};
        
        factory.getPoll = function(pollId) {
            return $http.get('/rest/polls/' + pollId);
        };
        
        factory.createPoll = function(data) {
            return $http.post('/rest/polls', data);
        };
        
        factory.updatePoll = function(data) {
            return $http.put('/rest/polls', data);
        };
        
        factory.deletepoll = function(pollId) {
            return $http.delete('/rest/polls/' + pollId);
        };
        
        return factory;    
    
    });*/