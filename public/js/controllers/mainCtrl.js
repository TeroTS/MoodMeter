(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', 'restFactory'];

	function mainCtrl($scope, restFactory) {
    	/*jshint validthis: true */
        var vm = this;

		vm.logout = function () {
		    restFactory.logout().then(function(response) {});
		};
	}

})();
