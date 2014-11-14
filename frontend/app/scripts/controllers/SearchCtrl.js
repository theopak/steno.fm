'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller for the `search` view which appears in the topbar on every page.
 */
app.controller('SearchCtrl', ['$scope', '$http', '$location', 'GlobalService', function ($scope, $http, $location, GlobalService) {
  
  $scope.isLoading = false;     // true if the typeahead is asyncronously loading results

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

  $scope.submitQueryInput = function() {
    console.log('SearchCtrl $scope.submitQueryInput() called');
    // GlobalService.submitQuery($scope.query);
    // $scope.$broadcast('submitQueryInput', $scope.query);
    $location.path('/search/' + $scope.query.input);
  };

}]);
