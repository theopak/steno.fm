'use strict';

/**
 * @ngdoc overview
 * @name stenoApp
 * @description
 * # stenoApp
 *
 * Main module of the application.
 */
angular
  .module('stenoApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
