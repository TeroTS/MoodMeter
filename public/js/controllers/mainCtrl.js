(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('mainCtrl', mainCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main', {
            abstract: true,
            url: '/',
            templateUrl: './views/main.html',
            controller: 'mainCtrl',
            controllerAs: 'vm',
            resolve: {
               loggedin: function(utilsService) {
                    utilsService.checkLoggedin();
                }
            }
        });
    }

    mainCtrl.$inject = ['restFactory'];
	function mainCtrl(restFactory) {
    	/*jshint validthis: true */
        var vm = this;
		vm.logout = function () {
		    restFactory.logout().then(function(response) {});
		};
	}

})();
