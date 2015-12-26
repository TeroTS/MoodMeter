(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('modalWindowCtrl', modalWindowCtrl);

    modalWindowCtrl.$inject = ['$modalInstance'];
    function modalWindowCtrl($modalInstance) {
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