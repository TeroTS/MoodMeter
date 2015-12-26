(function() {

    'use strict';

    angular
        .module('app.signup', ['ui.router'])
        .controller('signupCtrl', signupCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.signup', {
                url: 'signup',
                templateUrl: './views/signup.html',
                controller: 'signupCtrl',
                controllerAs: 'vm'
        });
    }

    signupCtrl.$inject = ['$http', '$location'];
    function signupCtrl($http, $location) {
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