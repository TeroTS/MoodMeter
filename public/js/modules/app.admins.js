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

    adminsCtrl.$inject = ['restFactory', 'dataService', 'utilsService', 'getAdmins'];
    function adminsCtrl(restFactory, dataService, utilsService, getAdmins) {
        /*jshint validthis: true */
        var vm = this;
        var adminEmail = '';
        vm.users = getAdmins.data;
        // vm.deleteAdmin = deleteAdmin;
        vm.open = openModal;
        vm.saveUser = saveUser;

        function deleteAdmin() {
            restFactory.deleteAdmin(adminEmail). //vm.users[idx].email).
                then(function(response) {
                    vm.alerts.push({type: 'success', msg: 'Admin deleted !'});
                }, function(reason) {
                    vm.alerts.push({type: 'danger', msg: 'Delete failed, reason: ' + reason});
                });
        }

        function saveUser(idx) {
            dataService.writeUserData('data', vm.users[idx]);
        }

        function openModal(idx) {
            adminEmail = vm.users[idx].email;
            utilsService.openModal('sm', deleteAdmin);
        }
    }

})();