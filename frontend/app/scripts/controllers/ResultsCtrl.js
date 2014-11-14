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
    input: '',
    title: '',
    speaker: '',
    rest: 'uninitialized'
  };

  // Helper function to grab a variable out of the working copy.
  var extractFromQuery = function(target) {
    var tokens = $scope.query.rest.split(' ');
    for(var i = 0; i < tokens.length; i++) {
      var pair = tokens[i].split(':');
      if(pair[0] === target) {
        $scope.query.rest = $scope.query.rest.replace(pair[0] + ':' + pair[1], '');
        return pair[1];
      }
    }
  };

  // Parse search field input.
  $scope.parseQuery = function() {
    $scope.query.rest = $scope.query.input.toLowerCase().trim();
    $scope.query.speaker = extractFromQuery('speaker');
    $scope.query.title = extractFromQuery('podcast') || extractFromQuery('title');
    console.log('ResultsCtrl.parseQuery done on $scope.query:', $scope.query);
  };

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
  $scope.submitInput = function() {
    console.log('ResultsCtrl $scope.submitQueryInput() called');
    $scope.parseQuery();
    $location.path('/search/' + $scope.query.input.trim());
    getResults();
  };

}]);
