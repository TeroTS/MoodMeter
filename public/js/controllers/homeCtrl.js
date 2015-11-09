(function() {
    'use strict';

    angular
        .module('moodMeter')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$rootScope', 'restFactory'];

    function homeCtrl($scope, $rootScope, restFactory) {
        /*jshint validthis: true */
        var vm = this;

        vm.rate = 5;
        vm.max = 10;
        vm.isReadonly = false;
        vm.alerts = [];
        vm.hoveringOver = hoveringOver;
        vm.postData = postData;

        function hoveringOver(value) {
          vm.overStar = value;
          vm.percent = 100 * (value / vm.max);
        }

        function postData() {
          var userId = $rootScope.user.id;
          var valueObject = {'value' : vm.rate};
          restFactory.postData(userId, valueObject).then(function(response) {vm.alerts.push({type: 'success', msg: 'Data sent succesfully !'});});
        }

        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

    }

})();