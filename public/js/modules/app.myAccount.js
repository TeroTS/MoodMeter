(function() {

    'use strict';

    angular
        .module('app.myAccount', ['ui.router'])
        .controller('myAccountCtrl', myAccountCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
	        .state('main.dashboard.viewUserData', {
	            url: '/:users/:id/data',
	            templateUrl: './views/myAccount.html',
	            controller: 'myAccountCtrl',
	            controllerAs: 'vm'
	      /*      resolve: {
	            	user: function() {
	            		return {isAdmin: true};
	            	}
	            } */
	        });
    }

    myAccountCtrl.$inject = ['restFactory', 'dataService', 'utilsService', 'constants'];
    function myAccountCtrl(restFactory, dataService, utilsService, constants) {
    	/*jshint validthis: true */
        var vm = this;

		vm.labels = [];
		vm.data = [[]];
		vm.timeOptions = ['1 week', '1 month', '3 months'];
		vm.selectedItem = '1 week'; //constants.DEFAULT_TIME_OPTION; //'1 week';
		// vm.isAdmin = user.isAdmin;
		vm.user = dataService.readUserData('data'); //utilsService.setUser(user);
		vm.getPeriodData = getPeriodData;
		vm.onClick = onClick;

		activate();

		function activate() {
			vm.getPeriodData('1 week'); //constants.DEFAULT_TIME_OPTION);
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