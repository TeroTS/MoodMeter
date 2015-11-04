(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('usersCtrl', usersCtrl);

    usersCtrl.$inject = ['$scope', 'dataService', 'getUsers'];

	function usersCtrl($scope, dataService, getUsers) {
        /*jshint validthis: true */
        var vm = this;
		//get all users
        vm.users = getUsers.data;
        //write data of the selected user to a persistence object
        //this object is used in other pages related to this user
        vm.getUser = function(idx) {
            var userData = vm.users[idx];
            dataService.writeUserData('data', userData);
        };
    }

})();