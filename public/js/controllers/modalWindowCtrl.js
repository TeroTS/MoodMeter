(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('modalWindowCtrl', modalWindowCtrl);

    modalWindowCtrl.$inject = ['$scope', '$modalInstance'];
    function modalWindowCtrl($scope, $modalInstance) {
        /*jshint validthis: true */
        var vm = this;

		vm.ok = function () {
			$modalInstance.close();
		};

		vm.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
    }

})();