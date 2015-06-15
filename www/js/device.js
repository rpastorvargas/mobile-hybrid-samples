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
		// Get the device properties and show
		$('#device_cordova').text(device.cordova);
		$('#device_model').text(device.model);
		$('#device_platform').text(device.platform);
		$('#device_uuid').text(device.uuid);
		$('#device_version').text(device.version);
    }
};
