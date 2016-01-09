/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Post from '../api/post/post.model';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var id1 = mongoose.Types.ObjectId();
var id2 = mongoose.Types.ObjectId();
var id3 = mongoose.Types.ObjectId();
var id4 = mongoose.Types.ObjectId();

Post.find({}).removeAsync()
  .then(function() {
    Post.create({
      category: 'news',
      subject: 'How is the food here?',
      author: id1,
      comments: [{
        content: 'Try the civiche!',
        author: id2,
      }, {
        content: 'Or the empanadas, they\'re great',
        author: id2,
      }],
      coords: {longitude: 0, latitude: 0},
    }, {
      category: 'politics',
      subject: 'How do you feel about your new president?',
      author: id1,
      comments: [{
        content: 'He\'s awesome!',
        author: id2,
      }, {
        content: 'But sometimes he blows',
        author: id2,
        active: false
      }],
      coords: {longitude: -60, latitude: 50},
    })
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      _id: id1,
      provider: 'local',
      name: 'G. Khan',
      email: 'gkhan@ow.com',
      lastCoordinates: {longitude: 102, latitude: 48},
      password: 'test'
    }, {
      _id: id2,
      provider: 'local',
      name: 'A. Hitler',
      email: 'ahitler@ow.com',
      lastCoordinates: {longitude: 9, latitude: 49},
      password: 'test'
    }, {
      _id: id3,
      provider: 'local',
      name: 'F. Castro',
      email: 'fcastro@ow.com',
      lastCoordinates: {longitude: -80, latitude: 22},
      password: 'test'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });
