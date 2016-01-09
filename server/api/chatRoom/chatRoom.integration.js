'use strict';

var app = require('../..');
var request = require('supertest');

var newChatRoom;

describe('ChatRoom API:', function() {

  describe('GET /api/chatRooms', function() {
    var chatRooms;

    beforeEach(function(done) {
      request(app)
        .get('/api/chatRooms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          chatRooms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      chatRooms.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/chatRooms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/chatRooms')
        .send({
          name: 'New ChatRoom',
          info: 'This is the brand new chatRoom!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newChatRoom = res.body;
          done();
        });
    });

    it('should respond with the newly created chatRoom', function() {
      newChatRoom.name.should.equal('New ChatRoom');
      newChatRoom.info.should.equal('This is the brand new chatRoom!!!');
    });

  });

  describe('GET /api/chatRooms/:id', function() {
    var chatRoom;

    beforeEach(function(done) {
      request(app)
        .get('/api/chatRooms/' + newChatRoom._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          chatRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      chatRoom = {};
    });

    it('should respond with the requested chatRoom', function() {
      chatRoom.name.should.equal('New ChatRoom');
      chatRoom.info.should.equal('This is the brand new chatRoom!!!');
    });

  });

  describe('PUT /api/chatRooms/:id', function() {
    var updatedChatRoom

    beforeEach(function(done) {
      request(app)
        .put('/api/chatRooms/' + newChatRoom._id)
        .send({
          name: 'Updated ChatRoom',
          info: 'This is the updated chatRoom!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedChatRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChatRoom = {};
    });

    it('should respond with the updated chatRoom', function() {
      updatedChatRoom.name.should.equal('Updated ChatRoom');
      updatedChatRoom.info.should.equal('This is the updated chatRoom!!!');
    });

  });

  describe('DELETE /api/chatRooms/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/chatRooms/' + newChatRoom._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when chatRoom does not exist', function(done) {
      request(app)
        .delete('/api/chatRooms/' + newChatRoom._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
