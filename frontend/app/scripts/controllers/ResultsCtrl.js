'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller for the `results` view.
 */
app.controller('ResultsCtrl', ['$scope', '$http', '$routeParams', '$location', 'ResultsService', 'GlobalService', 
  function ($scope, $http, $routeParams, $location, ResultsService, GlobalService) {
  
  // Show the header and footer for this view.
  GlobalService.showChrome();
  $scope.query = {
    input: ''
  };

  // Focus keyboard input in the search field
  $scope.keypress = function() {
    document.getElementById('query').focus();
  };

  // // Accept raw query input from the search field
  // $scope.$on('submitQuery', function(event, q) {
  //   console.log('submitQuery happened!', event, q);
  //   // $scope.query = q;
  // });

  // Search directly on elasticsearch LOL
  var getResults = function() {
    console.log('ResultsCtrl $scope.getResults() called.');
    ResultsService.search({
      index: 'episodes',
      body: {
        query: {
          match: {
            // _all: $scope.query.input
            _all: 'Accidental'
          }
        }
      }
    }).then(function (body) {
      console.log('ResultsCtrl $scope.getResults() success: body: ', body);
      var hits = body.hits.hits;
      $scope.results = hits;
    }, function (error) {
      console.trace(error.message);
    });
  };

  // Get results upon page load
  $scope.query.input = $routeParams.queryInput;
  getResults();

  // Go to a new page for a new search.
  $scope.submitQueryInput = function() {
    console.log('ResultsCtrl $scope.submitQueryInput() called');
    $location.path('/search/' + $scope.query.input);
    $scope.getResults();
  };

}]);
