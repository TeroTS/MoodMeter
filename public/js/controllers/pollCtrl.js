var pollCtrl = function ($scope, $routeParams, $location, dataService, restFactory, $modal) {
    
    $scope.users = [];
    $scope.newUser = {};
    $scope.edit = false;
    $scope.admin = false;
    
    //console.log($routeParams.admin);
    //admin page
 /*   if (typeof $routeParams.admin != 'undefined') {
        $scope.admin = true;
    }*/
    
    restFactory.getPoll($routeParams.pollId)
        .success(function(data, status, headers, config) {
           // console.log(data);
           // console.log(status);
            if (data === null) {
                $location.path("/pollNotFound");
            } else {
                $scope.poll = data;
                //console.log(data.participants);
                if (data.participants.length == 0) {
                    $scope.users = JSON.parse("[{}]");//data.participants);
                } else {
                    $scope.users = JSON.parse(data.participants); 
                }              
            }
            //admin page
          /*  if (typeof $routeParams.admin != 'undefined') {
                $scope.admin = true;
            }*/       
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
        console.log($scope.users);
        restFactory.updatePoll($routeParams.pollId, $scope.users)
        .success(function(data, status, headers, config) {
            //console.log(data);   
        })
        .error(function(data, status, headers, config) {
            console.log("Error: " + status);
        });       
    };
    
    $scope.deleteUser = function(user) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1); 
        restFactory.updatePoll($routeParams.pollId, $scope.users)
        .success(function(data, status, headers, config) {
            //console.log(data);   
        })
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
      //$location.path("/pollRemoved");
    }, function () {});
 };
  
  
};

angular.module('roodleApp').controller('pollCtrl', pollCtrl);