(function() {

    'use strict';

    angular
        .module('moodMeter')
        .service('utilsService', utilsService);

    dataService.$inject = ['$filter', 'dataService'];

    function utilsService($filter, dataService) {

		// if manager/admin looking for user data => user = selected user from cookiestore
		// else user looking his own data => user = session user
		/*jshint validthis: true */
	    this.setUser = function(user) {
			var userData = {};
			if (user.isAdmin)
				userData = dataService.readUserData('data');
			else
				userData = user.data;
			return userData;
		};

		this.setChartDataAndLabels = function(response) {
			var chartDataAndLabels = {};
			chartDataAndLabels.data = response.data.data;
			chartDataAndLabels.labels = [];
			for (var i = 0; i < response.data.dates.length; i++) {
			  	chartDataAndLabels.labels.push($filter('date')(response.data.dates[i], "shortDate"));
			}
			return chartDataAndLabels;
		};

    }

})();