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

    adminsCtrl.$inject = ['restFactory', 'dataService', 'getAdmins'];
    function adminsCtrl(restFactory, dataService, getAdmins) {
        /*jshint validthis: true */
        var vm = this;
        vm.users = getAdmins.data;
        vm.deleteAdmin = restFactory.deleteAdmin(vm.users[idx]._id).then(function(response) {});
        vm.saveUser = dataService.writeUserData('data', vm.users[idx]);
    }

})();