var generalCtrl = function ($scope, dataService) {
    
    $scope.stage1 = "bold";
    
    //init form
    $scope.data = dataService.readPollData();
    
    //Google autocomplete form
    var options = { types: ['geocode'], componentRestrictions: {country: 'fi'}};
    var inputFrom = document.getElementById('autocomplete');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.data.location = place.formatted_address;
        $scope.$apply();
    });
   
   //write data to persistence object
   $scope.writeData = function() {   
       for (var prop in $scope.data) {
           dataService.writePollData(prop, $scope.data[prop]);
       };
   };

};

angular.module('roodleApp').controller('generalCtrl', generalCtrl);
    
