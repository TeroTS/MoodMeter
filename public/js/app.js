var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    
    $routeProvider 
        // home page
        .when('/', {
            templateUrl: './views/start.html',
            controller: ''
        })  
        .when('/general', {
            templateUrl: './views/general.html',
            controller: 'generalCtrl'
        })
        .when('/time', {
            templateUrl: './views/timeProposals.html',
            controller: 'timeProposalsCtrl'
        })
        .when('/invite', {
            templateUrl: './views/invite.html',
            controller: 'inviteCtrl'
        })
         .when('/end', {
            templateUrl: './views/end.html',
            controller: 'endCtrl'
        })
        .when('/polls/:pollId', {
            templateUrl: './views/poll.html',
            controller: 'pollCtrl'
        })
        .when('/pollNotFound', {
            templateUrl: './views/pollNotFound.html',
            controller: ''
        })
        .when('/pollRemoved', {
            templateUrl: './views/pollRemoved.html',
            controller: ''
        })        
        .otherwise({
            templateUrl: '/views/pageNotFound.html',
            controller: ''
        });                          
});