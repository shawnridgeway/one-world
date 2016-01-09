/**
 * ChatRoom model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ChatRoom = require('./chatRoom.model');
var ChatRoomEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChatRoomEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ChatRoom.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ChatRoomEvents.emit(event + ':' + doc._id, doc);
    ChatRoomEvents.emit(event, doc);
  }
}

module.exports = ChatRoomEvents;
