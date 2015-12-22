(function() {

    'use strict';

    angular
        .module('moodMeter')
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