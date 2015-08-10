app.controller('dashboardCtrl', function($scope, restFactory, dataService) {

	$scope.user = 'Admin';

    //remove user data cookie, just to be sure
    dataService.deleteUserData('data');

	restFactory.getCounts()
        .success(function(data, status, headers, config) {
            $scope.numberOf = {users: data.users, managers: data.managers, admin: data.admins};
        })
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });

});