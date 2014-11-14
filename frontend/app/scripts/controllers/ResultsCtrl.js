'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller for the `results` view.
 */
app.controller('ResultsCtrl', ['$scope', '$http', '$routeParams', '$location', 'ResultsService', 'GlobalService', 'underscore',
  function ($scope, $http, $routeParams, $location, ResultsService, GlobalService, underscore) {
  
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
      index: 'segments',
      // q: $scope.query.input
    }).then(function (body) {
      console.log('ResultsCtrl $scope.getResults() success: body: ', body);
      var hits = body.hits.hits;

      // Group each segment into episodes within podcasts held as dicts within `$scope.res`.
      $scope.res = {};
      underscore.each(hits, function(value){
        console.log(value);
        var podcast = 'Podcast Title Placeholder';
        if(!(podcast in $scope.res)) {
            $scope.res[podcast] = {};
        }
        if(!(value._source.cluster_episode in $scope.res[podcast])) {
          $scope.res[podcast][value._source.cluster_episode] = [];
        }
        $scope.res[podcast][value._source.cluster_episode].push({
          podcastTitle: podcast,
          episodeTitle: value._source.cluster_episode,
          startTime: value._source.start_time,
          speaker: 'Unknown Speaker',
          desc: 'Hella narwhal Cosby sweater McSweeney\'s, salvia Facebook before they sold out High Life. Umami sriracha.'
        });
        _.each($source.query.term, function(v){ $scope.res[podcast][value._source.cluster_episode].desc = $scope.res[value._source.cluster_episode].desc.replace(v, '<strong>' + v + '</strong>'); });
      });

      console.log($scope.res);
      $scope.results = hits;
    }, function (error) {
      console.trace(error.message);
    });

    // Demo
    $scope.res = 
    {
      {'Accidental Tech Podcast': [
        '99 Always on Vacation in California': {
          podcastTitle: 'Accidental Tech Podcast',
          episodeTitle: '99 Always on Vacation in California',
          startTime: '99:01'
          speaker: 'Sirracha',
          desc: 'saucy iOS'
        },
        '96 Always on Vacation in California': {
          podcastTitle: 'Accidental Tech Podcast',
          episodeTitle: '96 Always on Vacation in California',
          startTime: '99:06'
          speaker: 'Sirracha',
          desc: 'saucy iOS'
        },
        '92 Always on Vacation in California': {
          podcastTitle: 'Accidental Tech Podcast',
          episodeTitle: '92 Always on Vacation in California',
          startTime: '99:02'
          speaker: 'Sirracha',
          desc: 'saucy iOS'
        }
      ]},
      {'Design Matters': [
      ]}
    };

  };

  // Get results upon page load
  $scope.query.input = $routeParams.queryInput;
  getResults();

  // Go to a new page for a new search.
  $scope.submitInput = function() {
    console.log('ResultsCtrl $scope.submitQueryInput() called');
    $scope.query.input = $scope.query.input.trim();
    $scope.parseQuery();
    $location.path('/search/' + $scope.query.input);
    getResults();
  };

}]);
