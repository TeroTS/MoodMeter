(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('signupCtrl', signupCtrl);

    signupCtrl.$inject = ['$scope', '$http', '$location'];

    function signupCtrl($scope, $http, $location) {
        // This object will be filled by the form
        $scope.userData = {};

        $scope.signup = function() {
            $http.post('/signup', {
                email: $scope.userData.email,
                password: $scope.userData.password,
            })
            .success(function(user) {
                $location.url('/login');
            })
            .error(function() {
                $location.url('/signup');
            });
        };
    }

})();