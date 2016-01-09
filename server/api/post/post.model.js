'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var LongLatSchema = new Schema({
	longitude: Number,
	latitude: Number
});

var CommentSchema = new Schema({
	content: String,
	author: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	postDate: {
		type: Date, 
		required: true, 
		default: new Date()
	},
	active: {
		type: Boolean, 
		required: true, 
		default: true
	}
});

var PostSchema = new Schema({
	category: {
		type: String
	},
  subject: String,
  author: {
  	type: mongoose.Schema.Types.ObjectId, 
  	ref: 'User'
  },
  comments: [CommentSchema],
  coords: LongLatSchema,
  postDate: {
  	type: Date, 
  	required: true, 
  	default: new Date()
  },
  active: {
  	type: Boolean, 
  	required: true, 
  	default: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
