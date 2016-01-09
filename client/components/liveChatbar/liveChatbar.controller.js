'use strict';

class LiveChatbar {
	constructor(chatService, $rootScope, Auth){
		this.chatService = chatService;
		this.$rootScope = $rootScope;
		this.chatText = 'Hello';
		this.Auth = Auth;
	}

	submit() {
		if (this.chatText !== '' && this.Auth.isLoggedIn() && this.chatService.isChatServiceReady()) {
			this.chatService.sendMessage(this.chatText);
			this.chatText = '';			
		};
		
	}

	keyPress(e) {
		if (e.keyCode === 13) {
			this.submit();
		};
	}

}

angular.module('oneWorldApp')
  .controller('LiveChatbarCtrl', LiveChatbar);
