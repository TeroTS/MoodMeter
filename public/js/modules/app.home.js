(function() {
    'use strict';

    angular
        .module('app.home', ['ui.router'])
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

    homeCtrl.$inject = ['$rootScope', 'restFactory', 'ratingButtonService'];
    function homeCtrl($rootScope, restFactory, ratingButtonService) {

        var rate = 0;
        /*jshint validthis: true */
        var vm = this;
        vm.postData = postData;
        vm.closeAlert = closeAlert;
        vm.ratingButtons = [];
        vm.setMouseover = setMouseover;
        vm.unsetMouseover = unsetMouseover;
        vm.setSelected = setSelected;
        vm.alerts = [];

        activate();


        function activate() {
            for (var i=0; i<5; i++) {
                vm.ratingButtons.push({notActive: true, mouseover: false, selected: false, value: i+1});
            }
        }

        function setMouseover(idx) {
            ratingButtonService.setMouseover(idx, vm.ratingButtons);
        }

        function unsetMouseover(idx) {
            ratingButtonService.unsetMouseover(idx, vm.ratingButtons);
        }

        function setSelected(idx) {
            rate = vm.ratingButtons[idx].value;
            ratingButtonService.setSelected(idx, vm.ratingButtons);
        }

        function postData() {
            var userId = $rootScope.user.id;
            var valueObject = {'value' : rate};
            restFactory.postData(userId, valueObject).then(function(response) {
                if (vm.alerts.length === 0) {
                    vm.alerts.push({type: 'success', msg: 'Kiitos palautteesta !'});
                }
            });
        }

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

    }

})();