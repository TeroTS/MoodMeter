angular.module('appRoutes', []).config(['$routeProvider', function($routeProvider, $locationProvider) {

    $routeProvider 
        // home page
        .when('/', {
            templateUrl: './views/yleista.html',
            controller: 'yleistaCtrl'
        });

}]);