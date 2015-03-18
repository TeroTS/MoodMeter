var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    
    $routeProvider 
        // home page
        .when('/login', {
            templateUrl: './views/login.html',
            controller: ''
        })  
        .when('/home', {
            templateUrl: './views/home.html',
            controller: ''
        })
        .otherwise({
        	redirectTo: '/login'
        });                          
});