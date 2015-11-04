(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$http', '$location'];

    function loginCtrl($scope, $http, $location) {
        $scope.login = function() {
            $http.post('/login', {
                email: $scope.user.email,
                password: $scope.user.password
            })
                .success(function(user) {
                    $location.url('/dashboard');
                })
                .error(function(data) {
                    $location.url('/login');
                });
        };
    }

})();