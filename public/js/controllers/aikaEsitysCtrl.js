var aikaEsitysCtrl = function ($scope, $filter) {
    
  //var prevDate;
  //$scope.minDate = $scope.minDate ? null : new Date();
    
  /*$scope.today = function() {
    $scope.dt = ''; //new Date();
  };
  $scope.today();*/
  $scope.dateList = {};

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
    //$scope.count = 0;
    //$scope.prevDate = '';
  };
  $scope.toggleMin();
  
  $scope.addDate = function(dateData) {
      tmpDate = $filter('date')(dateData, 'longDate');
      //lisää pvm property objektiin, jos on klikattu validia pvm:ää (imitoi settiä)
      if (typeof dateData !== "undefined") {
          $scope.dateList[tmpDate] = true;
      }
      //console.log($scope.dateList);
      //syötä objektin avaimet(=valitut päivämäärät) listaan
      var avaimet = [];
      for(var prop in $scope.dateList) {
         avaimet.push(prop); 
      }
      console.log(avaimet);
      
  };
  
 
 /* $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };*/

 /* $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };*/
  /*$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];*/
   
};

angular.module('roodleApp').controller('aikaEsitysCtrl', aikaEsitysCtrl);