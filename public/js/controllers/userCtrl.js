(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$state', '$modal', 'restFactory', 'getManagers'];

    function userCtrl($state, $modal, restFactory, getManagers) {
        /*jshint validthis: true */
        var vm = this;

        vm.user = dataService.readUserData('data');
        vm.managers = getManagers.data;
        vm.myManager = {};
        vm.alerts = [];
        vm.updateUser = updateUser;
        vm.open = open;
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

        //delete button modal control
        function open(size) {
            var modalInstance = $modal.open({
                templateUrl: './views/templates/modal.html',
                controller: 'modalWindowCtrl',
                size: size,
            });
            modalInstance.result.then(function () {
                deleteUser();
                $state.go('main.dashboard', {}, {reload: true});
            }, function () {});
        }

        function closealert(index) {
            vm.alerts.splice(index, 1);
        }
    }

})();