var app = angular.module('roodleApp', ['ngRoute']);

app.config(function($routeProvider) {
    
    $routeProvider 
        // home page
        .when('/', {
            templateUrl: './views/yleista.html',
            controller: 'yleistaCtrl'
        });
});