(function() {

    'use strict';

    angular
        .module('moodMeter')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$http', '$location'];

    function loginCtrl($scope, $http, $location) {
        /*jshint validthis: true */
        var vm = this;

        vm.login = function() {
            $http.post('/login', {
                email: vm.user.email,
                password: vm.user.password
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