(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('managersCtrl', managersCtrl);

    managersCtrl.$inject = ['$scope', 'dataService', 'getManagers'];

	function managersCtrl($scope, dataService, getManagers) {
        /*jshint validthis: true */
        var vm = this;

        // get all managers
        vm.users = getManagers.data;
        //write data of the selected user to a persistence object
        //this object is used in other pages related to this user
        vm.saveUser = function(idx) {
            dataService.writeUserData('data', vm.users[idx]);
        };
    }

})();