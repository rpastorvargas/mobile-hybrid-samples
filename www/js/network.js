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
		// Show the network status
		var status = app.checkConnection();
		$('#network_status').text(status);
		// Bind on/off line events
		document.addEventListener("offline", app.onOffline, false);
		document.addEventListener("online", app.onOnline, false);
    },
	
	checkConnection: function () {
		var networkState = navigator.connection.type;
	
		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
	
		return states[networkState];
	},
	
	onOffline: function(){
		alert("Offline !!!");
		// Update
		$('#network_status').text(app.checkConnection());
		
	},
	
	onOnline: function(){
		alert("Online !!!");
		// Update
		$('#network_status').text(app.checkConnection());
	}
};
