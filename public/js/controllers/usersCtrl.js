(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ['dataService', 'getUsers'];

	function usersCtrl(dataService, getUsers) {
        /*jshint validthis: true */
        var vm = this;
		//get all users
        vm.users = getUsers.data;
        //write data of the selected user to a persistence object
        //this object is used in other pages rvm.users[idx]elated to this user
        vm.saveUser = function(idx) {
            dataService.writeUserData('data', vm.users[idx]);
        };
    }

})();