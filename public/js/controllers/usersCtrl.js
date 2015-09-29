app.controller('usersCtrl', function($scope, $sce, restFactory, dataService) {

  //get all users
  restFactory.getUsers()
      .success(function(data, status, headers, config) {
          $scope.users = data;
          console.log(data);
      })
      .error(function(data, status, headers, config) {
          console.log("Error: " + status);
      });

  //write data of the selected user to a persistence object
  //this object is used in other pages related to this user
  $scope.getUser = function(idx) {
      var userData = $scope.users[idx];
      dataService.writeUserData('data', userData);
  };

  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

 $scope.htmlTooltip = $sce.trustAsHtml("<canvas id='bar' class='chart chart-bar' chart-data='[5, 6, 7, 8]' chart-labels='['2006', '2007', '2008', '2009']'></canvas");

});