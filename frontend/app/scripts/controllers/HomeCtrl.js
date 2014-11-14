'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller for everything on the `home` view, except for the search box which uses the common `SearchCtrl` controller.
 */
app.controller('HomeCtrl', ['$scope', '$http', 'GlobalUi', function ($scope, $http, GlobalUi) {
  
  // $scope.hideChrome = true;     // true if the top-bar and footer should be hidden
  $scope.selected = undefined;	// model (angular expression) assigned to
  $scope.isLoading = false;			// true if the typeahead is currently loading async results
  $scope.hideBtn = function() {
    GlobalUi.toggleChrome();
  }
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

}]);
