'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ChatRoomSchema = new Schema({
  active: Boolean,
  members: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	}]
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
