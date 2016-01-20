(function() {

    'use strict';

    angular
        .module('app.admins', ['ui.router'])
        .controller('adminsCtrl', adminsCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.dashboard.admins', {
            url: '/admins',
            templateUrl: './views/users.html',
            controller: 'adminsCtrl',
            controllerAs: 'vm',
            resolve: {
                getAdmins: function(restFactory) {
                    return restFactory.getAdmins();
                }
            }
        });
    }

    adminsCtrl.$inject = ['$state', 'restFactory', 'utilsService', 'getAdmins'];
    function adminsCtrl($state, restFactory, utilsService, getAdmins) {
        /*jshint validthis: true */
        var vm = this;
        vm.users = getAdmins.data;
        vm.open = openModal;
        vm.closeAlert = closeAlert;
        vm.alerts = [];

        function deleteAdmin(idx) {
            restFactory.deleteAdmin(vm.users[idx].email).
                then(function(response) {
                    $state.go($state.current, {}, {reload: true});
                }, function(reason) {
                    vm.alerts.push({type: 'danger', msg: 'Delete failed, reason: ' + reason});
                });
        }

        function openModal(idx) {
            utilsService.openModal('sm', deleteAdmin, [idx]);
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

    }

})();