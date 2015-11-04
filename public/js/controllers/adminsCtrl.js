(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('adminsCtrl', adminsCtrl);

    adminsCtrl.$inject = ['$scope', 'restFactory', 'dataService', 'getAdmins'];

    function adminsCtrl($scope, restFactory, dataService, getAdmins) {

        //get all admins
        $scope.users = getAdmins.data;

        $scope.deleteAdmin = function(idx) {
            var userData = $scope.users[idx];
            restFactory.deleteAdmin(userData._id).then(function(response) {});
        };

        //write data of the selected user to a persistence object
        //this object is used in other pages related to this user
        $scope.getUser = function(idx) {
            var userData = $scope.users[idx];
            dataService.writeUserData('data', userData);
        };

    }

})();