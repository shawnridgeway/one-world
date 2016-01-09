'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, chatService, $state, $rootScope, Auth) {
    var self = this;
    this.$http = $http;
    this.$state = $state;
    this.chatService = chatService;
    this.Auth = Auth;

    // Display Variables
    this.posts = this.posts || [];
    this.selectedPost = undefined;

    // Forum Variables
    this.forum = this.forum || {};
    this.forum.commentInput = '';

    // Map Settings
    this.map = this.map || {};
    this.map.control = {};
    this.map.status = {
      center: { latitude: 22, longitude: 0 },
      zoom: 2,
      bounds: {}
    };
    this.map.settings = {
      disableDefaultUI: true,
      styles: mapStyles,
      draggable: true,
      backgroundColor: '#fff',
      minZoom: 2,
      maxZoom: 9,
      streetViewControl: false,
    };

    // Map Events
    var lastValidCenter = new google.maps.LatLng(this.map.status.center.latitude, this.map.status.center.longitude);
    this.map.events = {
      center_changed: function(theMap) {
        // Ensure that the user cannot pan out of bounds
        if (theMap.getBounds().getNorthEast().lat() < 85 && 
            theMap.getBounds().getSouthWest().lat() > -85) {
          lastValidCenter = theMap.getCenter();
        }
        else {
          theMap.panTo(new google.maps.LatLng(lastValidCenter.lat(), theMap.getCenter().lng()));
        }
      },
      zoom_changed: function(theMap) {
        // Ensure that the user cannot zoom out and have out of bounds showing
        if (theMap.getBounds().getNorthEast().lat() > 85) {
          theMap.panTo(new google.maps.LatLng(theMap.getCenter().lat() - ( theMap.getBounds().getNorthEast().lat() - 85 ) * 10, theMap.getCenter().lng()));
        }
        else if (theMap.getBounds().getSouthWest().lat() < -85) {
          theMap.panTo(new google.maps.LatLng(theMap.getCenter().lat() - ( theMap.getBounds().getSouthWest().lat() + 85 ) * 10, theMap.getCenter().lng()));
        }
        else return;
      },
      dragstart: function(theMap) { 
        self.selectedPost = undefined;
      }
    };

    // Map icon generator
    var iconGen = function(scale, path) {
      return {
        path: path,
        scale: scale,
        strokeWeight: 0,
        fillColor: 'rgb(255,255,255)',
        fillOpacity: 1,
      }
    };
    this.map.icons = {
      politics: iconGen(0.2, fontawesome.markers.UNIVERSITY),
      culture: iconGen(0.2, fontawesome.markers.USERS),
      travel: iconGen(0.2, fontawesome.markers.PLANE),
      news: iconGen(0.2, fontawesome.markers.NEWSPAPER_O),
      user: iconGen(0.2, fontawesome.markers.MALE)
    };

    // Marker Click
    this.map.markerEvents = {
      click: function(marker, event, postObj) {
        self.selectedPost = postObj;
      }
    }

    this.symbols = {
      politics: 'fa fa-university',
      culture: 'fa fa-users',
      travel: 'fa fa-plane',
      news: 'fa fa-newspaper-o',
      user: 'fa fa-male'
    };
    var postGen = function(postObj) {
      postObj.icon = self.map.icons[postObj.category]; // Append icon
      postObj.symbolClass = self.symbols[postObj.category];
    }


    $http.get('/api/posts').then(response => {
      this.posts = response.data;
      for (var i = self.posts.length - 1; i >= 0; i--) {
        postGen(self.posts[i]);
      };
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      switch(toState.name) {
        case 'main.chat':
          self.selectedPost = undefined;
          if (!chatService.isChatServiceReady()) {
            self.chatService.init(self.map);
          }
          else {
            chatService.setChatVisible(true);
          }
          break;
        case 'main.forum':
          chatService.setChatVisible(false);
          break;
      }
    });
  }


  submitComment() {
    if (this.forum.commentInput !== '' && this.selectedPost !== undefined) {
      this.$http.post('/api/posts/' + this.selectedPost._id + '/comment', {content: this.commentInput, author: Auth.getCurrentUser()._id});
      this.commentInput = '';
    }
  }

  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  // }
}

angular.module('oneWorldApp')
  .controller('MainController', MainController);

})();
