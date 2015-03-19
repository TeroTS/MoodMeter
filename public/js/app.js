var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
	
    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0') {
          console.log('You are logged in.');
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();

        // Not Authenticated
        } else {
          console.log('You need to log in.');
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
/*    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('#/login');
          return $q.reject(response);
        }
      };
    }); */
    
    $routeProvider 
        // home page
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })  
        .when('/home', {
            templateUrl: './views/home.html',
            controller: '',
            resolve: {
            	loggedin: checkLoggedin
            }
        })
        .otherwise({
        	redirectTo: '/home'
        });                      
});