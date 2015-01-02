var aikaEsitysCtrl = function ($scope, $filter, dataService) {

  //tämän palauttamaa arvoa käytetään sorttauksessa 
 /* $scope.pvmSort = function(pvmString) {
    pvmDate = new Date(pvmString);
    return $filter('date')(pvmDate, 'yyyy-MM-dd');
  };*/
  $scope.stage2 = "bold";
 
  var dateList = {};
  $scope.avaimet = [];

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  
  //lisää valittu pvm taulukkoon, poista dublikaatit(set)
  $scope.addDate = function(pvm) {
      tmpDate = $filter('date')(pvm, 'yyyy-MM-dd');
      //lisää pvm property objektiin, jos on klikattu validia pvm:ää (imitoi settiä)
      if (typeof pvm !== "undefined") {
         dateList[tmpDate] = true;
      }
      //syötä objektin avaimet(=valitut päivämäärät) listaan
      $scope.avaimet = [];
      for(var prop in dateList) {
         propDate = new Date(prop);
         $scope.avaimet.push(propDate); 
      }
      //$scope.avaimet = avaimet;
      console.log($scope.avaimet);   
  };
   
  $scope.deletePvm = function(pvm) {
    for (var i=0, len=$scope.avaimet.length; i<len; i++) {
        if ($scope.avaimet[i] === pvm) {
           $scope.avaimet.splice(i,1);
           tmpDate = $filter('date')(pvm, 'yyyy-MM-dd');
           delete dateList[tmpDate];
           break;
        }
    }      
  };
  
  //kirjoita data servicen kautta persistence objektiin
  $scope.kirjoitaData = function() {
      dataService.kirjoitaData('pvm', $scope.avaimet);
  };  
   
};

angular.module('roodleApp').controller('aikaEsitysCtrl', aikaEsitysCtrl);