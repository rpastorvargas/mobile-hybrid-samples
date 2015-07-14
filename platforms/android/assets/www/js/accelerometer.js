var app = {
	
	_watchId : null,

	accelerometerOptions: {
		frequency: 5000
	},
	
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
		// Take a first acceleration data
		navigator.accelerometer.getCurrentAcceleration(app.onAccelerationSuccess, app.onAccelerationError);
		// Bind the event to button
		$('#accelerometerAction').bind('click', function(event){
			if ($('#accelerometerAction').hasClass('btn-success')){
				$('#accelerometerAction').removeClass('btn-success');
				$('#accelerometerAction').addClass('btn-danger');
				$('#accelerometerBtnMessage').text('Stop watching');
				_watchId = navigator.accelerometer.watchAcceleration(
						app.onAccelerationSuccess, 
						app.onAccelerationError, 
						app.accelerometerOptions);
			} else {
				navigator.accelerometer.clearWatch(_watchId);
				$('#accelerometerAction').removeClass('btn-danger');
				$('#accelerometerAction').addClass('btn-success');
				$('#accelerometerBtnMessage').text('Start watching');
			}
		});
    },
	
	onAccelerationSuccess: function (acceleration){
		var x = acceleration.x;
		var y = acceleration.y;
		var z = acceleration.z;
		var time = acceleration.timestamp;
		var _timeString = (new Date(time)).toLocaleString();
		$('#x').text(x.toFixed(2) + " m/s^2");
		$('#y').text(y.toFixed(2) + " m/s^2");
		$('#z').text(z.toFixed(2) + " m/s^2");
		$('#time').text(_timeString);
	},
	
	onAccelerationError: function (){
		alert('Error getting access to accelerometer');
	}
};