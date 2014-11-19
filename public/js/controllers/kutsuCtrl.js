var kutsuCtrl = function ($scope) {
    
    $scope.sposti = "";
    
    $scope.lahetaSposti = function() {
        console.log($scope.sposti);
    };
    
};

angular.module('roodleApp').controller('kutsuCtrl', kutsuCtrl);