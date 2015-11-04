(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('modalWindowCtrl', modalWindowCtrl);

    modalWindowCtrl.$inject = ['$scope', '$modalInstance'];

    function modalWindowCtrl($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
    }

})();