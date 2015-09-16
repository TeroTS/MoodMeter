var app = angular.module('moodMeter', ['ui.router', 'ui.bootstrap', 'chart.js', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    //================================================
    // Check if the user is connected
    //================================================
    var checkLoggedin = function($q, $http, $location, $rootScope, $timeout) {
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
          $timeout(function(){deferred.reject();}, 0);
          //deferred.reject();
          $rootScope.user = {};
          //$timeout(function() {
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

    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: './views/signup.html',
            controller: 'signupCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: './views/home.html',
            controller: 'homeCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('myAccount', {
            url: '/my-account',
            templateUrl: './views/myAccount.html',
            controller: 'myAccountCtrl',
            resolve: {
              loggedin: checkLoggedin
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: './views/dashboard.html',
            controller: 'dashboardCtrl',
            resolve: {
              loggedin: checkLoggedin
            }
        })
        .state('users', {
            url: '/users',
            templateUrl: './views/users.html',
            controller: 'usersCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .state('user', {
            url: '/user',
            templateUrl: './views/user.html',
            controller: 'userCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .state('viewUserData', {
            url: '/view-user-data',
            templateUrl: './views/viewUserData.html',
            controller: 'viewUserDataCtrl'
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        });

});

/*    $routeProvider
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
        .when('/users', {
            templateUrl: './views/users.html',
            controller: 'usersCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .when('/user', {
            templateUrl: './views/user.html',
            controller: 'userCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .when('/managers', {
            templateUrl: './views/users.html',
            controller: 'managersCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .when('/admins', {
            templateUrl: './views/users.html',
            controller: 'adminsCtrl',
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .when('/view-user-data', {
            templateUrl: './views/viewUserData.html',
            controller: 'viewUserDataCtrl'
           // resolve: {
           //     loggedin: checkLoggedin
           // }
        })
        .otherwise({
        	redirectTo: '/login'
        });
}); */