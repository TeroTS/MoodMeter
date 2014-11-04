var aikaEsitysCtrl = function ($scope) {
    
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

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