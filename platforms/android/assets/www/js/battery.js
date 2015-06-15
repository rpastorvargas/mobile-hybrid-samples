var app = {
	
	_battery : null,
	
	// Application Constructor
    initialize: function(battery) {
		_battery = battery;
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
		// Bind the battery events
		window.addEventListener("batterystatus", app.onBatteryStatus, false);
		window.addEventListener("batterylow", app.onBatteryLow, false);
		window.addEventListener("batterycritical", app.onBatteryCritical, false);
    },
	
	updateUI: function(batteryInfo){
		_battery.setValue(batteryInfo.level);
		$('#batteryLevel').text('Battery Level: ' + batteryInfo.level);
		if (batteryInfo.isPlugged){
			$('#isPluggedIcon').removeClass('hidden');
			$('#batteyIsPlugged').text('Battery pluged? YES');
		} else {
			$('#isPluggedIcon').addClass('hidden');
			$('#batteyIsPlugged').text('Battery pluged? NO');
		}
	},
	
	onBatteryStatus: function (batteryInfo){
		app.updateUI(batteryInfo);
	},

	onBatteryLow: function (batteryInfo){
		app.updateUI(batteryInfo);
		// Report to user
		alert('Battery is low!!!');
	},
	
	onBatteryCritical: function (batteryInfo){
		app.updateUI(batteryInfo);
		// Report to user
		// Report to user
		alert('Battery is critical!!!');
	},
};