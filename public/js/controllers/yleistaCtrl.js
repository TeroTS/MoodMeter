var yleistaCtrl = function ($scope) {
    
    var options = { types: ['geocode'], componentRestrictions: {country: 'fi'}};
    var inputFrom = document.getElementById('autocomplete');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.sijainti = place.formatted_address;
        $scope.$apply();
    });
    
    $scope.data = {
        otsikko: "",
        sijainti: "",
        kuvaus: "",
        nimi: "",
        sposti: ""
    };
    
};

angular.module('roodleApp').controller('yleistaCtrl', yleistaCtrl);
    
