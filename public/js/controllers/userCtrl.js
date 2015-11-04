(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$state', '$modal', 'restFactory', 'getManagers'];

    function userCtrl($scope, $state, $modal, restFactory, getManagers) {
        $scope.user = dataService.readUserData('data');
        $scope.myManager = {};
        $scope.alerts = [];

        // get all managers
        $scope.managers = getManagers.data;

        //select correct manager from return data and set it to model
        for (var i = 0; i < getManagers.data.length; i++) {
            if (getManagers.data[i].name === $scope.user.managerName)
                $scope.myManager = getManagers.data[i];
        }

        // this saves the state of the checkbox
        if ($scope.user.role === 'manager')
            $scope.isUserManager = true;
        else
            $scope.isUserManager = false;

        //update user data
        $scope.updateUser = function() {
            if ($scope.isUserManager === true) {
                $scope.user.role = 'manager';
                $scope.user.managerName = '';
            }
            restFactory.updateUser($scope.user.id, {role: $scope.user.role, manager: $scope.myManager.name})
                .then(function(response) {
                    $scope.user = response.data;
                    $scope.alerts.push({type: 'success', msg: 'User updated !'});
                });
        };

        //delete user data
        var deleteUser = function() {
            restFactory.deleteUser($scope.user.id).then(function(response) {});
        };

        //delete button modal control
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: './views/templates/modal.html',
                controller: 'modalWindowCtrl',
                size: size,
            });
            modalInstance.result.then(function () {
                deleteUser();
                $state.go('main.dashboard', {}, {reload: true});
            }, function () {});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }

})();