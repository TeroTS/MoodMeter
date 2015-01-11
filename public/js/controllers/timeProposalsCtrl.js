var timeProposalsCtrl = function ($scope, $filter, dataService) {  
 
  $scope.stage2 = "bold";
  
  //init dates list (array of dates)
  var initData = dataService.readPollData();
  $scope.dates = initData.dates;

  //set calendar min active date (today)
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  
  //add selected date to array (remove dublicates)
  $scope.addDate = function(dt) {
      var dateDublicateFound = false;
      var newDate = dt;
      //don't push dublicates into array
      for (var i=0, len=$scope.dates.length; i<len; i++) {
          var existingDate = $scope.dates[i];
          if ( (existingDate.getDate() == newDate.getDate()) && 
               (existingDate.getMonth() == newDate.getMonth()) && 
               (existingDate.getFullYear() == newDate.getFullYear()) ) {
            dateDublicateFound = true;
            break;
          }    
      }
      
      if (!dateDublicateFound) {
        $scope.dates.push(newDate);          
      }

  };
   
  $scope.deleteDate = function(dt) {
    for (var i=0, len=$scope.dates.length; i<len; i++) {
        if ($scope.dates[i] === dt) {
           $scope.dates.splice(i,1);
           break;
        }
    }      
  };
  
  //write dates to persistence object
  $scope.writeData = function() {
      dataService.writePollData('dates', $scope.dates);
  };  
   
};

angular.module('roodleApp').controller('timeProposalsCtrl', timeProposalsCtrl);