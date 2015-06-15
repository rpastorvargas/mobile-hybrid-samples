var app = {
	
	_watchId : null,
	_widget : null,
	compassOptions: {
		frequency: 2000
	},
	
	// Application Constructor
    initialize: function(widget) {
		_widget = widget;
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
		// Get the actual value of compass
		navigator.compass.getCurrentHeading(app.onCompassSuccess, app.onCompassError);
		// Bind the event to button
		$('#compassAction').bind('click', function(event){
			if ($('#compassAction').hasClass('btn-success')){
				$('#compassAction').removeClass('btn-success');
				$('#compassAction').addClass('btn-danger');
				$('#compassBtnMessage').text('Stop watching');
				_watchId = navigator.compass.watchHeading(
					app.onCompassSuccess, 
					app.onCompassError, 
					app.compassOptions);
			} else {
				navigator.compass.clearWatch(_watchId);
				$('#compassAction').removeClass('btn-danger');
				$('#compassAction').addClass('btn-success');
				$('#compassBtnMessage').text('Start watching');
			}
		});
    },
	
	onCompassSuccess: function (compassHeading){
		var heading = compassHeading.magneticHeading;
		var trueHeading = compassHeading.trueHeading;
		var accuraccy = compassHeading.headingAccuracy;
		var time = compassHeading.timestamp;
		var _timeString = (new Date(time)).toLocaleString();
		$('#compassInfoHeading').text("Magnetic Heading: " + heading.toFixed(1) + "º");
		$('#compassInfoTrueHeading').text("True Heading: " + trueHeading.toFixed(1) + "º");
		$('#compassInfoAccurracy').text("Accuraccy: " + accuraccy.toFixed(1) + " m");
		$('#compassInfoTimestamp').text("Timestamp: " + _timeString);
		// Update the widget value
		_widget.getByName("Slider1").setValue(heading);
	},
	
	onCompassError: function (error){
		alert('Error getting access to compass. Error code: ' + error.code);
	}
};