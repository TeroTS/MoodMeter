var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    
    $routeProvider 
        // home page
        .when('/', {
            templateUrl: './views/yleista.html',
            controller: 'yleistaCtrl'
        })
        .when('/aika', {
            templateUrl: './views/aikaEsitys.html',
            controller: 'aikaEsitysCtrl'
        })
        .when('/kutsu', {
            templateUrl: './views/kutsu.html',
            controller: 'kutsuCtrl'
        })
         .when('/loppu', {
            templateUrl: './views/loppu.html',
            controller: 'loppuCtrl'
        });     
               
});