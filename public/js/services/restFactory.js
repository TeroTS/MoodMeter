var restFactory = function($http) {

    var factory = {};
    
    factory.postData = function(id, data) {
        return $http.post('/users/' + id + '/data', data);
    };
    
    factory.getData = function(id, timePeriod) {
        return $http.get('/users/' + id + '/data', {params: {period: timePeriod}});
    };
    
    factory.getUsers = function() {
        return $http.get('/users');
    };
    
    factory.getUser = function(id) {
        return $http.get('/users/' + id);
    };     
    
    factory.deleteUser = function(id) {
        return $http.delete('/users/' + id);
    };
    
    factory.updateUser = function(id, data) {
        return $http.put('/users/' + id, data);
    };
    
    factory.getAdmins = function() {
        return $http.get('/admins');
    };
    
    factory.deleteAdmin = function(email) {
        return $http.delete('/admins/' + email);
    };
    
    factory.getCounts = function() {
        return $http.get('/counts');  
    };
    
    return factory;
};
    
angular.module('roodleApp').factory('restFactory', restFactory);