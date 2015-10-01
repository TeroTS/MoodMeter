app.controller('mainCtrl', function($scope, restFactory) {

    $scope.logout = function () {
        restFactory.logout().then(function(response) {});
    };

});
