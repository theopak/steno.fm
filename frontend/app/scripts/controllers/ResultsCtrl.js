'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller for the `results` view.
 */
app.controller('ResultsCtrl', ['$scope', '$http', '$routeParams', '$location', 'ResultsService', 'GlobalService', 'underscore', '$sce',
  function ($scope, $http, $routeParams, $location, ResultsService, GlobalService, underscore, $sce) {
  
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
$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  // Search directly on elasticsearch LOL
  var getResults = function() {
    console.log('ResultsCtrl $scope.getResults() called.');
    ResultsService.search({
      index: 'segments',
      text: $scope.query.input
    }).then(function (body) {
      console.log('ResultsCtrl $scope.getResults() success: body: ', body);
      var hits = body.hits.hits;

      // Group each segment into episodes within podcasts held as dicts within `$scope.res`.
      $scope.res = {};
      underscore.each(hits, function(value){
        console.log(value);
        var podcast = value._source.podcast_title;
        if(!(podcast in $scope.res)) {
            $scope.res[podcast] = {};
        }
        if(!(value._source.cluster_episode in $scope.res[podcast])) {
          $scope.res[podcast][value._source.cluster_episode] = [];
        }
        $scope.res[podcast][value._source.cluster_episode].push({
          podcastTitle:   value._source.podcast_title,
          episodeTitle:   value._source.cluster_episode,
          startTime:      value._source.start_time,
          mediaThumbnail: value._source.media_thumbnail,
          remoteUrl:      value._source.remote_url,
          speaker:        value._source.speaker,
          desc:           value._source.text
        });
        underscore.each($scope.query.term, function(v){ $scope.res[podcast][value._source.cluster_episode].desc = $scope.res[value._source.cluster_episode].desc.replace(v, '<strong>' + v + '</strong>'); });
      });

      console.log($scope.res);
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
    $scope.query.input = $scope.query.input.trim();
    $scope.parseQuery();
    $location.path('/search/' + $scope.query.input);
    getResults();
  };

}]);
