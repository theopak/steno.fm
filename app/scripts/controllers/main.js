'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stenoApp
 */
angular.module('stenoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
