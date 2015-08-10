app.service('dataService', function($cookieStore) {

    this.writeUserData = function(key, data) {
        $cookieStore.put(key, data);
    };

    this.readUserData = function(key) {
        data = $cookieStore.get(key);
        return data;
    };

    this.deleteUserData = function(key) {
        $cookieStore.remove(key);
    };

});
