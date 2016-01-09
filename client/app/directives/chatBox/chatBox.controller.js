'use strict';

class chatBox {
	constructor(chatService){
		this.chatService = chatService;
		this.chatText = 'Hello';
	}

	submit() {
		this.chatService.sendMessage(this.chatText);
		this.chatText = '';
	}

}

angular.module('oneWorldApp')
  .controller('ChatBoxCtrl', chatBox);
