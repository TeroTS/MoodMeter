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
        .state('main', {
            abstract: true,
            url: '/',
            templateUrl: './views/main.html',
            controller: 'mainCtrl',
            resolve: {
               loggedin: checkLoggedin
            }
        })
        .state('main.signup', {
            url: 'signup',
            templateUrl: './views/signup.html',
            controller: 'signupCtrl'
        })
        .state('main.home', {
            url: 'home',
            templateUrl: './views/home.html',
            controller: 'homeCtrl'
     //       resolve: {
     //           loggedin: checkLoggedin
     //       }
        })
        .state('main.myAccount', {
            url: 'my-account',
            templateUrl: './views/myAccount.html',
            controller: 'myAccountCtrl'
   /*         resolve: {
              loggedin: checkLoggedin
            } */
        })
        .state('main.dashboard', {
            url: 'dashboard',
            templateUrl: './views/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .state('main.dashboard.users', {
            url: '/users',
            templateUrl: './views/users.html',
            controller: 'usersCtrl'
        })
        .state('main.dashboard.user', {
            url: '/users/:id',
            templateUrl: './views/user.html',
            controller: 'userCtrl'
        })
        .state('main.dashboard.viewUserData', {
            url: '/users/data/:id',
            templateUrl: './views/viewUserData.html',
            controller: 'viewUserDataCtrl'
        })
        .state('main.dashboard.managers', {
            url: '/users',
            templateUrl: './views/users.html',
            controller: 'managersCtrl'
        })
        .state('main.dashboard.admins', {
            url: '/admins',
            templateUrl: './views/users.html',
            controller: 'adminsCtrl'
        });
});
