var app = angular.module('roodleApp', ['ngRoute', 'ui.bootstrap', 'chart.js']);

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
          //save user object
          $rootScope.user = user;
          console.log(user);
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
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          //console.log(response);
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });
    
    $routeProvider 
        // home page
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })
        .when('/signup', {
            templateUrl: './views/signup.html',
            controller: 'signupCtrl'
        })
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'homeCtrl',
            resolve: {
            	loggedin: checkLoggedin
            }
        })
        .when('/my-account', {
            templateUrl: './views/myAccount.html',
            controller: 'myAccountCtrl',
            resolve: {
            	loggedin: checkLoggedin
            }
        })
        .when('/dashboard', {
            templateUrl: './views/dashboard.html',
            controller: 'dashboardCtrl',
            resolve: {
            	loggedin: checkLoggedin
            }
        })        
        .otherwise({
        	redirectTo: '/login'
        });                      
});