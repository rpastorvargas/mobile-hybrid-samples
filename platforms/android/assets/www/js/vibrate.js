// JavaScript Document
var app = {
	
	// Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
		// Bind the button event
		$('#vibrateAction').bind('click', app.onVibrateAction);
    },
	
	onVibrateAction: function(event){
		var ms = parseInt($('#vibrationMs').val());
		navigator.vibrate(ms);
	}
};
