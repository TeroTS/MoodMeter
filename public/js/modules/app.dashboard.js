(function() {

    'use strict';

    angular
        .module('app.dashboard', ['ui.router'])
        .controller('dashboardCtrl', dashboardCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.dashboard', {
            url: 'dashboard',
            templateUrl: './views/dashboard.html',
            controller: 'dashboardCtrl',
            controllerAs: 'vm',
            resolve: {
                getCounts: function(restFactory) {
                    return restFactory.getCounts();
                }
            }
	    });
    }

    dashboardCtrl.$inject = ['getCounts'];
	function dashboardCtrl(getCounts) {
		/*jshint validthis: true */
        var vm = this;
	    // get counts of users, managers and admins
	    var numberOf = getCounts.data;
	    vm.numberOf = {users: numberOf.users, managers: numberOf.managers, admin: numberOf.admins};
	}

})();