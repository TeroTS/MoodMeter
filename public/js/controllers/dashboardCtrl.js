app.controller('dashboardCtrl', function($scope, $rootScope, restFactory, dataService) {

	$scope.user = $rootScope.user.role;
    $scope.isManager = ($rootScope.user.role === "manager");
    console.log($scope.isManager);

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