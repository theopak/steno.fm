'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller for the `results` view.
 */
app.controller('ResultsCtrl', ['$scope', '$http', '$routeParams', 'ResultsService', 'GlobalService', function ($scope, $http, $routeParams, ResultsService, GlobalService) {
  
  // Show the header and footer for this view.
  GlobalService.showChrome();
  $scope.query = {
    input: ''
  };

  // Focus keyboard input in the search field
  $scope.keypress = function(keyEvent) {
    document.getElementById('query').focus();
  };

  // // Accept raw query input from the search field
  // $scope.$on('submitQuery', function(event, q) {
  //   console.log('submitQuery happened!', event, q);
  //   // $scope.query = q;
  // });

  // Get the query
  var input = $routeParams.queryInput;
  // GlobalService.submitQuery(input);

  // Search directly on elasticsearch LOL
  $scope.query.input = input;
  $scope.getResults = function() {
    console.log('ResultsCtrl $scope.getResults() called.');
    ResultsService.search({
      q: input
    }).then(function (body) {
      var hits = body.hits.hits;
      $scope.results = hits;
    }, function (error) {
      console.trace(error.message);
    });
  }

}]);
