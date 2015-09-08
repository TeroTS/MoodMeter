app.controller('dashboardCtrl', function($scope, $rootScope, restFactory, dataService) {

    $scope.home = "nonactive";
    $scope.account = "nonactive";
    $scope.dashboard = "active";
    $scope.user = $rootScope.user;
    //$scope.isAdmin = ($rootScope.user.role === "admin");
    //$scope.isUser = ($rootScope.user.role === "user");

	//$scope.user = $rootScope.user.role;
    //console.log($scope.isManager);

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