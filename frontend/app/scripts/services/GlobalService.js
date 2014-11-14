'use strict';

// Service to store and retrieve application wide data
app.factory('GlobalService', [function () {
  var Globals = {
    hiddenStatus: true,
    isHiddenChrome: function() {
      return this.hiddenStatus;
    },
    // getStatus: function  () {
    //  // alert('working');
    //  return this.isHiddenChrome;
    // },
    showChrome: function() {
      this.hiddenStatus = false;
    },
    hideChrome: function() {
      this.hiddenStatus = true;
    },
    toggleChrome: function() {
      this.hiddenStatus = !this.hiddenStatus;
    },

    focusSearchField: function() {
      var searchField = document.getElementById('query');
      if(searchField) {
        searchField.focus();
      }
    },

    query: {
      input: ''
    },
    submitQuery: function(q) {
      console.log('GlobalService.submitQuery() called');
      this.query = q;
    }
  };

  return Globals;
}]);