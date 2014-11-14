'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller that's common on every page.
 */
app.controller('MainCtrl', ['$scope', 'GlobalUi', function ($scope, GlobalUi) {
  $scope.GlobalUi = GlobalUi;

  $scope.keypress = function(keyEvent) {
    document.getElementById('query').focus();
  }
}]);
