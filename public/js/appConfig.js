(function() {

    'use strict';

    angular
        .module('moodMeter')
        .config('checkLoggedin', checkLoggedin);

    checkLoggedin.$inject = ['$q', '$http', '$location', '$rootScope', '$timeout'];

    function checkLoggedin()  {

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

    }


})();