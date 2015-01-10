var yleistaCtrl = function ($scope, dataService) {
    
    $scope.stage1 = "bold";
    
    $scope.data = {
        otsikko: "",
        sijainti: "",
        kuvaus: "",
        nimi: "",
        sposti: ""
    };
    
    var options = { types: ['geocode'], componentRestrictions: {country: 'fi'}};
    var inputFrom = document.getElementById('autocomplete');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.data.sijainti = place.formatted_address;
        $scope.$apply();
        //console.log($scope.data.sijainti);
    });
   
   //kirjoita data servicen kautta persistence objektiin
   $scope.kirjoitaData = function() {   
       for (var prop in $scope.data) {
           //console.log($scope.data[prop]);
           dataService.kirjoitaData(prop, $scope.data[prop]);
       };
       //data = dataService.lueData();
       //console.log(data.sijainti);
   };

};

angular.module('roodleApp').controller('yleistaCtrl', yleistaCtrl);
    
