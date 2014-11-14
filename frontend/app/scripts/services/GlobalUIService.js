'use strict';

// Service to store and retrieve application wide data
app.factory('GlobalUi', [function(){
	var Globals = {
		hidden_status: true,
		isHiddenChrome: function() {
			return this.hidden_status;
		},
		// getStatus: function	() {
		// 	// alert('working');
		// 	return this.isHiddenChrome;
		// },
		showChrome: function() {
			this.hidden_status = false;
		},
		hideChrome: function() {
			this.hidden_status = true;
		},
		toggleChrome: function() {
			console.log("working");
			this.hidden_status = !this.hidden_status;
		}
	};
	return Globals;
}]);