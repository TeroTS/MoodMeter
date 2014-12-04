var dataService = function() {
    
    //poista default arvot myöhemmin
    roodleData = {
        'otsikko': "",
        'sijainti': "",
        'kuvaus': "",
        'nimi': "",
        'sposti': "",
        'pvm': [],
        'osallistujatSposti': [],
        'osallistujat': [],
        'hallinnointiUrl': "",
        'kyselyUrl': ""
    };
    
    this.kirjoitaData = function(prop, data) {      
        roodleData[prop] = data; 
    };
    
    this.lueData = function() {
        return roodleData;
    };
       
};

angular.module('roodleApp').service('dataService', dataService);

/*angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    };       

}]);*/