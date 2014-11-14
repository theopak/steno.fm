'use strict';

/**
 * @ngdoc overview
 * @name stenoApp
 * @description
 * # stenoApp
 *
 * Main module of the application.
 */
var app = angular
  .module('stenoApp', [
    'ngAnimate',
    'ngRoute',
    'mm.foundation',
    'elasticsearch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/search/:queryInput', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('euiHost', 'http://steno.fm:9200');
