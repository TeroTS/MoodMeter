app.controller('mainCtrl', function($scope, $rootScope) {

    $scope.user = $rootScope.user;
    $scope.title = "test";
    console.log("main title: " + $scope.title);

});