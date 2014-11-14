'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for everything on the `home` view, except for the search box which uses the common `SearchCtrl` controller.
 */
app.controller('HomeCtrl', ['$scope', '$http', '$location', 'GlobalService', function ($scope, $http, $location, GlobalService) {

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
  $scope.submitQueryInput = function() {
    $location.path('/search/' + $scope.query.input);
  };

  // Hide the header and footer for this view.
  GlobalService.hideChrome();

}]);
