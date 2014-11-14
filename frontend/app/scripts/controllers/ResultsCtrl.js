'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller for the `results` view.
 */
app.controller('ResultsCtrl', ['$scope', '$http', function ($scope, $http) {
  
  $scope.query = $scope.GlobalUi.query;
  
  // Show the header and footer for this view.
  $scope.GlobalUi.showChrome();

}]);
