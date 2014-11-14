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
    'mm.foundation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/search', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
