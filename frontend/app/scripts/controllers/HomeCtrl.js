'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for everything on the `home` view, except for the search box which uses the common `SearchCtrl` controller.
 */
app.controller('HomeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  
  // $scope.hideChrome = true;     // true if the top-bar and footer should be hidden
  $scope.selected = undefined;	// model (angular expression) assigned to
  $scope.isLoading = false;			// true if the typeahead is currently loading async results

  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(res){
      var addresses = [];
      angular.forEach(res.data.results, function(item){
        addresses.push(item.formatted_address);
      });
      return addresses;
    });
  };

  // Route to the results page as soon as any text is entered, skipping animations if necessary.
  $scope.skipToResultsView = function(query) {
    $location.path('/search');
  };

  // Hide the header and footer for this view.
  $scope.GlobalUi.hideChrome();

}]);
