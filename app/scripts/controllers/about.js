'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stenoApp
 */
angular.module('stenoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
