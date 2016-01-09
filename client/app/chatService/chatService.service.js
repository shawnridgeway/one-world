'use strict';

angular.module('oneWorldApp')
  .service('chatService', function ($rootScope, Auth, $http) {
  	var self = this;
  	var socketio = undefined;
  	var serviceInitiated = false;
    var map = undefined;

    // Users to display
    var thisUser = undefined;
    var otherUsers = [];

    this.sendMessage = function(message) {
    	// Check if service is ready
    	if (serviceInitiated) {
    		// Check the message is a string
	    	if (typeof message === 'string' || message instanceof String) {
	    		// Check if message is not empty
	    		if (message !== '') {
	    			// Send the message
	    			socketio.emit('send message', {message: message, owner: thisUser._id});
	    		};
	    	};
    	};
    };

    this.isChatServiceReady = function() {
    	return serviceInitiated;
    }

    this.setChatVisible = function(value) {
  		if (thisUser) {
        thisUser.chatBox.setVisibility(value);
      }
      for (var i = otherUsers.length - 1; i >= 0; i--) {
        otherUsers[i].chatBox.setVisibility(value);
      };
    }

    this.init = function(initMap) {
    	if (!serviceInitiated) {
    		socketio = io('', {path: '/socket.io-client'});
    		map = initMap;
    		loadThisUser();
        loadOtherUsers();
    	};
    }

    var userGen = function(userObj) {
      var newChat = new MapChatBox(
                          new google.maps.LatLng(
                            userObj.lastCoordinates.latitude, 
                            userObj.lastCoordinates.longitude
                          ),
                          map.control.getGMap()
                        );
      userObj.chatBox = newChat;
    }

    var loadOtherUsers = function(){
    	// Find chat room
    	// Load users
      $http.get('/api/users/group').then(response => {
        otherUsers = response.data;
        // Process Users
        for (var i = 0; i < otherUsers.length; i++) {
          (function(j){
            userGen(otherUsers[j]);
            socketio.on(
              'new message', 
              function(messageObj) {
                if (messageObj.owner === otherUsers[j]._id) {
                  otherUsers[j].chatBox.addMessage(messageObj.message);
                };
              }
            )
          })(i);
        }
      });
    }

    var loadThisUser = function() {
      // Get Current User
      thisUser = Auth.getCurrentUser();
      // Update user's geolocation
      if (navigator.geolocation) {
        // First ask for the user's permission. Gets more specific location
        navigator.geolocation.getCurrentPosition(function(position) {
          // thisUser.lastCoordinates.latitude = position.coords.latitude;
          // thisUser.lastCoordinates.longitude = position.coords.longitude;
          userGen(thisUser);
          serviceInitiated = true;
          socketio.on(
						'new message', 
			  		function(messageObj) {
							if (messageObj.owner === thisUser._id) {
                console.log(messageObj);
                thisUser.chatBox.addMessage(messageObj.message);
              };
						}
				  )
        })
      }
      else {
        // Otherwise use IP address to get the location. Usually within 25 miles
        // thisUser.lastCoordinates.latitude = geoplugin_latitude();
        // thisUser.lastCoordinates.longitude = geoplugin_longitude();
        userGen(thisUser);
        serviceInitiated = true;
        socketio.on(
					'new message', 
		  		function(messageObj) {
            if (messageObj.owner === thisUser._id) {
              console.log(messageObj);
              thisUser.chatBox.addMessage(messageObj.message);
            };
					}
			  )
      }
      

      /* 
	      For Errors in Nvigation
	      navigator.geolocation.getCurrentPosition(function(position) {
	        // same as above
	      }, function(error) {
	        alert('Error occurred. Error code: ' + error.code);
	        // error.code can be:
	        //   0: unknown error
	        //   1: permission denied
	        //   2: position unavailable (error response from locaton provider)
	        //   3: timed out
	      }); 
			*/
    }
  });
