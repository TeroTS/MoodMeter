(function() {
    'use strict';

    angular
        .module('moodMeter')
        .controller('homeCtrl', homeCtrl)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('main.home', {
            url: 'home',
            templateUrl: './views/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm',
            resolve: {
                // delete user data cookie
                removeUserData: function(dataService) {
                    dataService.deleteUserData('data');
                }
            }
        });
    }

    homeCtrl.$inject = ['$rootScope', 'restFactory'];
    function homeCtrl($rootScope, restFactory) {
        /*jshint validthis: true */
        var vm = this;
        vm.rate = 5;
        vm.max = 10;
        vm.isReadonly = false;
        vm.alerts = [];
        vm.hoveringOver = hoveringOver;
        vm.postData = postData;
        vm.closeAlert = closeAlert;

        function hoveringOver(value) {
          vm.overStar = value;
          vm.percent = 100 * (value / vm.max);
        }

        function postData() {
          var userId = $rootScope.user.id;
          var valueObject = {'value' : vm.rate};
          restFactory.postData(userId, valueObject).then(function(response) {vm.alerts.push({type: 'success', msg: 'Data sent succesfully !'});});
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

    }

})();