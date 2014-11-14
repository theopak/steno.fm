'use strict';

/**
 * @ngdoc function
 * @name stenoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller that's common on every page.
 */
app.controller('MainCtrl', ['$scope', function ($scope) {

  // Focus on search box for all keypresses on any page, except special `keyEvent`s.
  $scope.keypress = function(keyEvent) {
    if(keyEvent.which === 27){
      // 27 ESC
      console.log('MainCtrl detected [ESC] keypress.', keyEvent);
      jQuery('#debug').slideToggle();
    } else {
      document.getElementById('query').focus();
    }
  };

}]);
