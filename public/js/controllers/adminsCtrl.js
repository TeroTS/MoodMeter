(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('adminsCtrl', adminsCtrl);

    adminsCtrl.$inject = ['restFactory', 'dataService', 'getAdmins'];

    function adminsCtrl(restFactory, dataService, getAdmins) {

        /*jshint validthis: true */
        var vm = this;

        vm.users = getAdmins.data;
        vm.deleteAdmin = restFactory.deleteAdmin(vm.users[idx]._id).then(function(response) {});
        vm.saveUser = dataService.writeUserData('data', vm.users[idx]);

    }

})();