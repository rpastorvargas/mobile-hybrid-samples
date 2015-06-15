var app = {
	
	cameraAPIOptions : {},
	
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
		// Bind the buttons events
		$('#photoAction').bind('click', app.onPhotoAction);
		$('#fileAction').bind('click', app.onFileAction);
    },
	
	
	onPhotoAction: function (event){
		// Set the options: from camera
		app.cameraAPIOptions.sourceType = Camera.PictureSourceType.CAMERA;
		app.cameraAPIOptions.destinationType = parseInt($( "#destinationType" ).val());
		// Call the method
		app.getImage();
	},

	onFileAction: function (event){
		app.cameraAPIOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
		app.cameraAPIOptions.destinationType = parseInt($( "#destinationType" ).val());
		// Call the method
		app.getImage();
	},
	
	getImage: function (options){
		// Call the method
		navigator.camera.getPicture(app.onSuccess, app.onFail,app.cameraAPIOptions);
	},
	
	onSuccess: function(image){
		if (app.cameraAPIOptions.destinationType == Camera.DestinationType.FILE_URI){
			$('#deviceImage').prop('src',image);
			alert("This is the File URI: " + image);
		} else if (app.cameraAPIOptions.destinationType == Camera.DestinationType.DATA_URL){
			$('#deviceImage').prop('src',"data:image/jpeg;base64," + image);
			alert("This is the DATA URL: " + image.substring(0,40) +"...");
		} else {
			// NATIVE
			$('#deviceImage').prop('src',image);
			alert("This is the NATIVE URI: " + image);
		}
	},
	
	onFail: function(message){
		alert("Error getting picture/image: " + message);
	}
};