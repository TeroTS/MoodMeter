(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('signupCtrl', signupCtrl);

    signupCtrl.$inject = ['$scope', '$http', '$location'];

    function signupCtrl($scope, $http, $location) {
        /*jshint validthis: true */
        var vm = this;
        // This object will be filled by the form
        vm.userData = {};

        vm.signup = function() {
            $http.post('/signup', {
                email: vm.userData.email,
                password: vm.userData.password,
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