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
        /*jshint validthis: true */
        var vm = this;
        vm.postData = postData;
        vm.closeAlert = closeAlert;
        vm.ratingButtons = [];
        vm.setMouseover = setMouseover;
        vm.unsetMouseover = unsetMouseover;
        vm.setSelected = setSelected;

        activate();

        function activate() {
            for (var i=0; i<5; i++) {
                vm.ratingButtons.push({notActive: true, mouseover: false, selected: false});
            }
        }

        function setMouseover(idx) {
            ratingButtonService.setMouseover(idx, vm.ratingButtons);
        }

        function unsetMouseover(idx) {
            for (var i=0; i<vm.ratingButtons.length; i++) {
                vm.ratingButtons[i].mouseover = false;
                if (i === idx) {
                    if (vm.ratingButtons[i].selected === true) {
                        vm.ratingButtons[i].notActive = false;
                    } else {
                        vm.ratingButtons[i].notActive = true;
                    }

                } else {
                    vm.ratingButtons[i].notActive = true;
                }
            }
        }

        function setSelected(idx) {
            for (var i=0; i<vm.ratingButtons.length; i++) {
                if (i === idx) {
                    vm.ratingButtons[i].notActive = false;
                    vm.ratingButtons[i].mouseover = false;
                    vm.ratingButtons[i].selected = true;
                } else {
                    vm.ratingButtons[i].notActive = true;
                    vm.ratingButtons[i].mouseover = false;
                    vm.ratingButtons[i].selected = false;
                }
            }
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