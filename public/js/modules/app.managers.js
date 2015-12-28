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

    managersCtrl.$inject = ['$state', 'dataService', 'utilsService', 'restFactory', 'getManagers'];
	function managersCtrl($state, dataService, utilsService, restFactory, getManagers) {
        /*jshint validthis: true */
        var vm = this;
        // get all managers
        vm.users = getManagers.data;
        vm.roleForUrl = 'managers';
        vm.open = openModal;
        vm.alerts = [];
        vm.closeAlert = closeAlert;

        vm.saveUser = function(idx) {
            dataService.writeUserData('data', vm.users[idx]);
        };

        function deleteUser(idx) {
            restFactory.deleteUser(vm.users[idx].id)
                .then(function(response) {
                    $state.go($state.current, {}, {reload: true});
                    // vm.alerts.push({type: 'success', msg: 'User deleted !'});
                }, function(reason) {
                    vm.alerts.push({type: 'danger', msg: 'Delete failed, reason: ' + reason});
                });
        }

        function openModal(idx) {
            utilsService.openModal('sm', deleteUser, [idx]);
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }
    }

})();