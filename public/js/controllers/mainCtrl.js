(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', 'restFactory'];

	function mainCtrl($scope, restFactory) {
		$scope.logout = function () {
		    restFactory.logout().then(function(response) {});
		};
	}

})();
