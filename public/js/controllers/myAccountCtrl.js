(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('myAccountCtrl', myAccountCtrl);

    myAccountCtrl.$inject = ['$scope', 'restFactory', 'user', 'utilsService'];

    function myAccountCtrl($scope, restFactory, user, utilsService) {
    	/*jshint validthis: true */
        var vm = this;

		vm.labels = [];
		vm.data = [[]];
		vm.timeOptions = ['1 week', '1 month', '3 months'];
		vm.selectedItem = '1 week';
		vm.isAdmin = user.isAdmin;
		vm.user = utilsService.setUser(user);
		vm.getPeriodData = getPeriodData;
		vm.onClick = onClick;

		activate();

		function activate() {
			vm.getPeriodData('1 week');
		}

		function onClick(points, evt) {
		    console.log(points, evt);
		}

		// get selected time period user data
		function getPeriodData(period) {
			if (period !== '') {
				restFactory.getData(vm.user.id, period)
				  	.then(function(data) {
				  		var dataAndLabels = utilsService.setChartDataAndLabels(data);
				  		vm.data[0] =  dataAndLabels.data;
				  		vm.labels = dataAndLabels.labels;
				  	});
			}
		}
    }

})();