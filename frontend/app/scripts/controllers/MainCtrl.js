'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller that's common on every page.
 */
app.controller('MainCtrl', ['$scope', function ($scope) {

  // Focus on search box for all keypresses on any page.
  $scope.keypress = function(keyEvent) {
    document.getElementById('query').focus();
  };
  
}]);
