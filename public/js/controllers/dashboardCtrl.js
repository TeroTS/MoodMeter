(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope', 'getCounts'];

	function dashboardCtrl($scope, getCounts) {
	    // get counts of users, managers and admins
	    var data = getCounts.data;
	    $scope.numberOf = {users: data.users, managers: data.managers, admin: data.admins};
	}

})();