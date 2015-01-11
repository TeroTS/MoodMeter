var pollCtrl = function ($scope, $routeParams, $location, dataService, restFactory, $modal) {
    
    $scope.users = [];
    $scope.newUser = {};
    $scope.edit = false;
    
    restFactory.getPoll($routeParams.pollId)
        .success(function(data, status, headers, config) {
            if (data === null) {
                $location.path("/pollNotFound");
            } else {
                $scope.poll = data;
                if (data.participants.length == 0) {
                    $scope.users = [];
                } else {
                    $scope.users = JSON.parse(data.participants); 
                }              
            }  
        })
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });
        
    var deletePoll = function() {
        restFactory.deletePoll($routeParams.pollId)
        .success(function(data, status, headers, config) { 
            $location.path("/pollRemoved");
        })    
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });
    };  
        
    $scope.saveData = function() {
        //add new user
        if ($scope.edit == false) {
           $scope.users.push($scope.newUser);
        }
        $scope.edit = false;
        $scope.newUser = {};
        restFactory.updatePoll($routeParams.pollId, $scope.users)
        .success(function(data, status, headers, config) {})
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });       
    };
    
    $scope.deleteUser = function(user) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1); 
        restFactory.updatePoll($routeParams.pollId, $scope.users)
        .success(function(data, status, headers, config) {})
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        }); 
    };
    
    $scope.editUser = function(user) {
       $scope.edit = true;
       $scope.newUser = user;
    };
   
 //modal control   
 $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: './views/modal.html',
      controller: 'modalWindowCtrl',
      size: size,
    });
  
    modalInstance.result.then(function () {
      deletePoll();
    }, function () {});
 };
  
  
};

angular.module('roodleApp').controller('pollCtrl', pollCtrl);