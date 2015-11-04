(function() {

    'use strict';

    angular
        .module('moodMeter')
        .service('dataService', dataService);

    dataService.$inject = ['$cookieStore'];

    function dataService($cookieStore) {

        this.writeUserData = function(key, data) {
            $cookieStore.put(key, data);
        };

        this.readUserData = function(key) {
            var data = $cookieStore.get(key);
            return data;
        };

        this.deleteUserData = function(key) {
            $cookieStore.remove(key);
        };

    }

})();