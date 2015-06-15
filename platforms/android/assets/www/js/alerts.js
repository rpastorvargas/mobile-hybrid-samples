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
		// Bind the buttons event
		$('#beepAction').bind('click', app.onBeepButton);
		$('#alertAction').bind('click', app.onAlertButton);
		$('#confirmAction').bind('click', app.onConfirmButton);
		$('#promptAction').bind('click', app.onPromptButton);
    },
	
	onBeepButton: function(event){
		var times = parseInt($('#beepQuantity').val());
		navigator.notification.beep(times);
	},
	
	onAlertButton: function(event){
		navigator.notification.alert(
			'Asynchronous Alert from Cordova!!!',  // message
			function(){ // callback
				$('#messageText').text("Alert: pressed Hello button");
			},         
			'Press the hello button', // title
			'Hello'                   // buttonName);
		);
	},
	
	onConfirmButton: function(event){
		navigator.notification.confirm(
			'Asynchronous Confirm from Cordova!!!',  // message
			function(buttonIndex){ // callback to invoke with index of button pressed
				$('#messageText').text("Confirm --> button pressed: " + buttonIndex);
			},         
			'Select a button', // title
			['B1','B2','B3']   // buttonLabels
		);
	},
	
	onPromptButton: function(event){
		navigator.notification.prompt(
			'Asynchronous Prompt from Cordova!!!. Enter a text:',  // message
			function(results){ // callback to invoke with index of button pressed
				$('#messageText').text("Prompt --> button pressed: " + results.buttonIndex + " and the text introduced was : " + results.input1);
			},         
			'Enter a text', // title
			['Ok','Cancel','Update'],   // buttonLabels
			'This is the default text' // defaultText
		);
	}

};
