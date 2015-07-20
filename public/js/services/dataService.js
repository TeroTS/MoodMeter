app.service('dataService', function($cookieStore) {
    /*userData = {
        id: "",
        name: "",
        email: ""
    };*/

   userData = {};

    this.writeUserData = function(key, data) {
        //userData[prop] = data;
        $cookieStore.put(key, data);
    };

    this.readUserData = function(key) {
        //return userData;
        data = $cookieStore.get(key);
        return data;
    };

});
//angular.module('roodleApp').service('dataService', dataService);
