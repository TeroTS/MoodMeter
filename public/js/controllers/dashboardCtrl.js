(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope', 'getCounts'];

	function dashboardCtrl($scope, getCounts) {
		/*jshint validthis: true */
        var vm = this;
	    // get counts of users, managers and admins
	    var numberOf = getCounts.data;
	    vm.numberOf = {users: numberOf.users, managers: numberOf.managers, admin: numberOf.admins};
	}

})();