(function() {

    'use strict';

    angular
        .module('moodMeter')
        .service('utilsService', utilsService);

    utilsService.$inject = ['$q', '$http', '$location', '$rootScope', '$timeout', '$filter', '$modal', 'dataService'];
    function utilsService($q, $http, $location, $rootScope, $timeout, $filter, $modal, dataService) {

	    // Check if the user is logged in
	    /*jshint validthis: true */
	    this.checkLoggedin = function() {
	        var deferred = $q.defer();
	        $http.get('/loggedin').success(function(user) {
	            // Authenticated
	            if (user !== '0') {
	                console.log('You are logged in.');
	                //save user object, global session variable
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

		// if manager/admin looking for user data => user = selected user from cookiestore
		// else user looking his own data => user = session user
	/*    this.setUser = function(user) {
			var userData = {};
			if (user.isAdmin)
				userData = dataService.readUserData('data');
			else
				userData = user.data;
			return userData;
		}; */

		this.setChartDataAndLabels = function(response) {
			var chartDataAndLabels = {};
			chartDataAndLabels.data = response.data.data;
			chartDataAndLabels.labels = [];
			for (var i = 0; i < response.data.dates.length; i++) {
			  	chartDataAndLabels.labels.push($filter('date')(response.data.dates[i], "shortDate"));
			}
			return chartDataAndLabels;
		};

        //delete button modal control
        this.openModal = function(size, action) {
            var modalInstance = $modal.open({
                templateUrl: './views/templates/modal.html',
                controller: 'modalWindowCtrl',
                controllerAs: 'vm',
                size: size,
            });
            modalInstance.result.then(function () {
                action();
                $state.go('main.dashboard', {}, {reload: true});
            }, function () {});
        };

    }

})();