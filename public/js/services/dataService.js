app.service('dataService', function() {

   /* userData = {
        id: "",
        name: "",
        email: ""
    };*/
    var userData = {};
    
    this.writeUserData = function(prop, data) {      
        userData[prop] = data; 
    };
    
    this.readUserData = function() {
        return userData;
    };
       
});
