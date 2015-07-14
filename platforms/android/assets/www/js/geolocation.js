var app = {
	
	_watchId : null,
	_latitude: null,
	_longitude: null,
	
	geoLocationOptions: {
		enableHighAccuracy: true,
    	timeout: 10000
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
		// Get the actual value of position
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, app.geoLocationOptions);
		// Bind the event to button
		$('#geoLocationAction').bind('click', function(event){
			if ($('#geoLocationAction').hasClass('btn-success')){
				$('#geoLocationAction').removeClass('btn-success');
				$('#geoLocationAction').addClass('btn-danger');
				$('#geoLocationBtnMessage').text('Stop watching');
				_watchId = navigator.geolocation.watchPosition(
					app.onSuccess, 
					app.onError, 
					app.geoLocationOptions);
			} else {
				navigator.geolocation.clearWatch(_watchId);
				$('#geoLocationAction').removeClass('btn-danger');
				$('#geoLocationAction').addClass('btn-success');
				$('#geoLocationBtnMessage').text('Start watching');
			}
		});
		
		// Bind the update map event
		$('#mapUpdate').bind('click', function(event){
			app.updateMap();
		});
    },
	
	onSuccess: function (position){
		var latitude = position.coords.latitude;
		_latitude = latitude;
		var longitude = position.coords.longitude;
		_longitude = longitude;
		var altitude = position.coords.altitude;
		var accuracy = position.coords.accuracy;
		var altitudeAccuracy = position.coords.altitudeAccuracy;
		var heading = position.coords.heading;
		var speed = position.coords.speed;
		var time = position.timestamp;
		
		var _timeString = (new Date(time)).toLocaleString();
		$('#geoLocationTimestamp').text("Timestamp: " + _timeString);
		
		// Data from coords
		$('#geoLocationInfoLatitude').text("Latitude: " + app.formatValue(latitude) + " grades");
		$('#geoLocationInfoLongitude').text("Longitude: " + app.formatValue(longitude) + " grades");
		$('#geoLocationInfoAltitude').text("Altitude: " + app.formatValue(altitude) + " m");
		$('#geoLocationInfoAccuracy').text("Accuracy: " + app.formatValue(accuracy) + " m");
		$('#geoLocationInfoHeading').text("Heading: " + app.formatValue(heading) + " grades");
		$('#geoLocationInfoSpeed').text("Speed: " + app.formatValue(speed) + " m/s");
		$('#geoLocationInfoAltitudeAccuracy').text("Altitude accuracy: " + app.formatValue(altitudeAccuracy) + " m");
							
	},
	
	onError: function (error){
		alert('Error getting access to geolocation. Error code: ' + error.code +
			'\nMessage: ' + error.message);
	},
	
	updateMap: function(){
		// Update the map value
		var urlMap = 'http://maps.google.com/maps/api/staticmap?center=' + _latitude + ',' + _longitude + '&zoom=12&size=600x300&sensor=false&markers=' + _latitude + ',' + _longitude;
  		$('#map').attr('src', urlMap);
	},
	
	formatValue: function(value){
		var formattedValue = "N/A";
		if (value != null){
			formattedValue = value.toFixed(1);
		} 
		return formattedValue;
	}
};