(function() {

    'use strict';

    angular
        .module('app.users', ['ui.router'])
        .controller('usersCtrl', usersCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.dashboard.users', {
            url: '/users',
            templateUrl: './views/users.html',
            controller: 'usersCtrl',
            controllerAs: 'vm',
            resolve: {
                getUsers: function(restFactory) {
                    return restFactory.getUsers();
                }
            }
        });
    }

    usersCtrl.$inject = ['$state', 'dataService', 'utilsService', 'restFactory', 'getUsers'];
	function usersCtrl($state, dataService, utilsService, restFactory, getUsers) {
        /*jshint validthis: true */
        var vm = this;
		//get all users
        vm.users = getUsers.data;
        vm.roleForUrl = 'users';
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