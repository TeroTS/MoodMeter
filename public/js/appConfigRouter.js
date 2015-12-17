(function() {

    'use strict';

    angular
        .module('moodMeter')
        .config(config);

	function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

	    $urlRouterProvider.otherwise('/login');

	    $stateProvider
	        //================================================
	     /*   .state('login', {
	            url: '/login',
	            templateUrl: './views/login.html',
	            controller: 'loginCtrl',
	            controllerAs: 'vm'
	        }) */
	        //================================================
	    /*    .state('main', {
	            abstract: true,
	            url: '/',
	            templateUrl: './views/main.html',
	            controller: 'mainCtrl',
	            controllerAs: 'vm',
	            resolve: {
	               loggedin: checkLoggedin
	            }
	        }) */
	        //================================================
	       /* .state('main.signup', {
	            url: 'signup',
	            templateUrl: './views/signup.html',
	            controller: 'signupCtrl',
	            controllerAs: 'vm'
	        }) */
	        //================================================
	/*        .state('main.home', {
	            url: 'home',
	            templateUrl: './views/home.html',
	            controller: 'homeCtrl',
	            controllerAs: 'vm',
	            resolve: {
	                // delete user data cookie
	                removeUserData: function(dataService) {
	                    dataService.deleteUserData('data');
	                }
	            }
	        }) */
	        //================================================
	      /*  .state('main.myAccount', {
	            url: 'my-account',
	            templateUrl: './views/myAccount.html',
	            controller: 'myAccountCtrl',
	            controllerAs: 'vm',
	            resolve: {
	            	user: function($rootScope) {
	            		return {data: $rootScope.user, isAdmin: false};
	            	}
	            }
	        }) */
	        //================================================
/*	        .state('main.dashboard', {
	            url: 'dashboard',
	            templateUrl: './views/dashboard.html',
	            controller: 'dashboardCtrl',
	            controllerAs: 'vm',
	            resolve: {
	                getCounts: function(restFactory) {
	                    return restFactory.getCounts();
	                }
	            }
	        }) */
	        //================================================
	        .state('main.dashboard.users', {
	            url: '/users',
	            templateUrl: './views/users.html',
	            controller: 'usersCtrl',
	            controllerAs: 'vm',
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
	            controllerAs: 'vm',
	            resolve: {
	                getManagers: function(restFactory) {
	                    return restFactory.getManagers();
	                }
	            }
	        });
	        //================================================
	     /*   .state('main.dashboard.viewUserData', {
	            url: '/users/data/:id',
	            templateUrl: './views/myAccount.html',
	            controller: 'myAccountCtrl',
	            controllerAs: 'vm',
	            resolve: {
	            	user: function() {
	            		return {isAdmin: true};
	            	}
	            }
	        }); */
	        //================================================
/*	        .state('main.dashboard.managers', {
	            url: '/managers',
	            templateUrl: './views/users.html',
	            controller: 'managersCtrl',
	            controllerAs: 'vm',
	            resolve: {
	                getManagers: function(restFactory) {
	                    return restFactory.getManagers();
	                }
	            }
	        }); */
	        //================================================
/*	        .state('main.dashboard.admins', {
	            url: '/admins',
	            templateUrl: './views/users.html',
	            controller: 'adminsCtrl',
	            controllerAs: 'vm',
	            resolve: {
	                getAdmins: function(restFactory) {
	                    return restFactory.getAdmins();
	                }
	            }
	        }); */

	}

})();