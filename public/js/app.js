var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    
    $routeProvider 
        // home page
        .when('/', {
            templateUrl: './views/start.html',
            controller: ''
        })  
        .when('/yleista', {
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
        })
        //poll page
        .when('/polls/:pollId', {
            templateUrl: './views/poll.html',
            controller: 'pollCtrl'
        }) 
        //poll admin page              
       /* .when('/polls/:pollId/:admin', {
            templateUrl: './views/poll.html',
            controller: 'pollCtrl'
        })*/
        .when('/pollNotFound', {
            templateUrl: './views/pollNotFound.html',
            controller: ''
        })
        .otherwise({
            templateUrl: '/views/pageNotFound.html',
            controller: ''
        });                          
});