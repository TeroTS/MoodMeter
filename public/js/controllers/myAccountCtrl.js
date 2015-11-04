(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('myAccountCtrl', myAccountCtrl);

    myAccountCtrl.$inject = ['$scope', '$filter', 'restFactory', 'user', 'dataService'];

    function myAccountCtrl($scope, $filter, restFactory, user, dataService) {
    	/*jshint validthis: true */
        var vm = this;

		vm.labels = [];
		vm.data = [[]];
		vm.timeOptions = ['1 week', '1 month', '3 months'];
		vm.selectedItem = '1 week';
		vm.isAdmin = user.isAdmin;
		vm.user = setUser;
		vm.getPeriodData = getPeriodData;
		vm.onClick = onClick;

		activate();

		function activate() {
			// get default time period of 1 week
			vm.getPeriodData('1 week');
		}

		function onClick(points, evt) {
		    console.log(points, evt);
		}

		// get selected time period user data
		function getPeriodData(period) {
			if (period !== '') {
				restFactory.getData(vm.user.id, period)
				  	.then(function(response) {
						vm.data[0] = response.data.data;
						vm.labels = [];
						for (var i = 0; i < response.data.dates.length; i++) {
						  	vm.labels.push($filter('date')(response.data.dates[i], "shortDate"));
						}
					});
			}
		}

		// if manager/admin looking for user data => user == selected user from cookiestore
		// else user looking his own data => user == session user
		function setUser() {
			var userData = {};
			if (user.isAdmin)
				userData = dataService.readUserData('data');
			else
				userData = user.data;
			return userData;
		}

    }

})();