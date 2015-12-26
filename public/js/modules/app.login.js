(function() {

    'use strict';

    angular
        .module('app.login', ['ui.router'])
        .controller('loginCtrl', loginCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        });
    }

    loginCtrl.$inject = ['$http', '$location'];
    function loginCtrl($http, $location) {
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