(function() {

    'use strict';

    angular
        .module('app.managers', ['ui.router'])
        .controller('managersCtrl', managersCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.dashboard.managers', {
            url: '/managers',
            templateUrl: './views/users.html',
            controller: 'managersCtrl',
            controllerAs: 'vm',
            resolve: {
                getManagers: function(restFactory) {
                    return restFactory.getManagers();
                }
            }
        });
    }

    managersCtrl.$inject = ['dataService', 'getManagers'];
	function managersCtrl(dataService, getManagers) {
        /*jshint validthis: true */
        var vm = this;
        // get all managers
        vm.users = getManagers.data;
        vm.roleForUrl = 'managers';

        vm.saveUser = function(idx) {
            dataService.writeUserData('data', vm.users[idx]);
        };
    }

})();