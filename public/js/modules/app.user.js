(function() {

    'use strict';

    angular
        .module('app.user', ['ui.router'])
        .controller('userCtrl', userCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.dashboard.user', {
            url: '/users/:id',
            templateUrl: './views/user.html',
            controller: 'userCtrl',
            controllerAs: 'vm',
            resolve: {
                getManagers: function(restFactory) {
                    return restFactory.getManagers();
                }
            }
        });
    }

    userCtrl.$inject = ['$state', 'restFactory', 'utilsService', 'dataService', 'getManagers'];
    function userCtrl($state, restFactory, utilsService, dataService, getManagers) {
        /*jshint validthis: true */
        var vm = this;

        vm.user = dataService.readUserData('data');
        vm.managers = getManagers.data;
        vm.myManager = {};
        vm.alerts = [];
        vm.updateUser = updateUser;
        vm.open = openModal;
        vm.closeAlert = closeAlert;

        activate();

        function activate() {
            // this saves the state of the checkbox
            if (vm.user.role === 'manager')
                vm.isUserManager = true;
            else
                vm.isUserManager = false;
            //select correct manager
            for (var i = 0; i < getManagers.data.length; i++) {
                if (getManagers.data[i].name === vm.user.managerName)
                    vm.myManager = getManagers.data[i];
            }
        }

        function updateUser() {
            if (vm.isUserManager === true) {
                vm.user.role = 'manager';
                vm.user.managerName = '';
            }
            restFactory.updateUser(vm.user.id, {role: vm.user.role, manager: vm.myManager.name})
                .then(function(response) {
                    vm.user = response.data;
                    vm.alerts.push({type: 'success', msg: 'User updated !'});
                });
        }

        var deleteUser = function() {
            restFactory.deleteUser(vm.user.id).then(function(response) {});
        };

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        function openModal() {
            utilsService.openModal('sm', deleteUser);
        }
    }

})();