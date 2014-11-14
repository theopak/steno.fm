'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stenoApp
 */
app.controller('MainCtrl', function ($scope, $http) {
  
  $scope.selected = undefined;	// model (angular expression) assigned to
  $scope.isLoading = false;			// true if the typeahead is asyncronously loading results
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

});
