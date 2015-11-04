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
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        //================================================
        .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })
        //================================================
        .state('main', {
            abstract: true,
            url: '/',
            templateUrl: './views/main.html',
            controller: function($scope, restFactory) {
                $scope.logout = function () {
                    restFactory.logout().then(function(response) {});
                };
            },
            resolve: {
               loggedin: checkLoggedin
            }
        })
        //================================================
        .state('main.signup', {
            url: 'signup',
            templateUrl: './views/signup.html',
            controller: 'signupCtrl'
        })
        //================================================
        .state('main.home', {
            url: 'home',
            templateUrl: './views/home.html',
            controller: 'homeCtrl',
            resolve: {
                // delete user data cookie
                removeUserData: function(dataService) {
                    dataService.deleteUserData('data');
                }
            }
        })
        //================================================
        .state('main.myAccount', {
            url: 'my-account',
            templateUrl: './views/myAccount.html',
            controller: 'myAccountCtrl'
        })
        //================================================
        .state('main.dashboard', {
            url: 'dashboard',
            templateUrl: './views/dashboard.html',
            controller: function($scope, getCounts) {
                // get counts of users, managers and admins
                var data = getCounts.data;
                $scope.numberOf = {users: data.users, managers: data.managers, admin: data.admins};
            },
            resolve: {
                getCounts: function(restFactory) {
                    return restFactory.getCounts();
                }
            }
        })
        //================================================
        .state('main.dashboard.users', {
            url: '/users',
            templateUrl: './views/users.html',
            controller: function($scope, dataService, getUsers) {
                //get all users
                $scope.users = getUsers.data;
                //write data of the selected user to a persistence object
                //this object is used in other pages related to this user
                $scope.getUser = function(idx) {
                    var userData = $scope.users[idx];
                    dataService.writeUserData('data', userData);
                };
            },
            resolve: {
                getUsers: function(restFactory) {
                    return restFactory.getUsers();
                }
            }
        })
        //================================================
        .state('main.dashboard.user', {
            url: '/users/:id',
            templateUrl: './views/user.html',
            controller: 'userCtrl',
            resolve: {
                getManagers: function(restFactory) {
                    return restFactory.getManagers();
                }
            }
        })
        //================================================
        .state('main.dashboard.viewUserData', {
            url: '/users/data/:id',
            templateUrl: './views/myAccount.html',
            controller: 'myAccountCtrl'
        })
        //================================================
        .state('main.dashboard.managers', {
            url: '/managers',
            templateUrl: './views/users.html',
            controller: function($scope, dataService, getManagers) {
                // get all managers
                $scope.users = getManagers.data;
                //write data of the selected user to a persistence object
                //this object is used in other pages related to this user
                $scope.getUser = function(idx) {
                    var userData = $scope.users[idx];
                    dataService.writeUserData('data', userData);
                };
            },
            resolve: {
                getManagers: function(restFactory) {
                    return restFactory.getManagers();
                }
            }
        })
        //================================================
        .state('main.dashboard.admins', {
            url: '/admins',
            templateUrl: './views/users.html',
            controller: 'adminsCtrl',
            resolve: {
                getAdmins: function(restFactory) {
                    return restFactory.getAdmins();
                }
            }
        });
});
