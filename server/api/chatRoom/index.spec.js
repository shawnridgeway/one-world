'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var chatRoomCtrlStub = {
  index: 'chatRoomCtrl.index',
  show: 'chatRoomCtrl.show',
  create: 'chatRoomCtrl.create',
  update: 'chatRoomCtrl.update',
  destroy: 'chatRoomCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var chatRoomIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './chatRoom.controller': chatRoomCtrlStub
});

describe('ChatRoom API Router:', function() {

  it('should return an express router instance', function() {
    chatRoomIndex.should.equal(routerStub);
  });

  describe('GET /api/chatRooms', function() {

    it('should route to chatRoom.controller.index', function() {
      routerStub.get
        .withArgs('/', 'chatRoomCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/chatRooms/:id', function() {

    it('should route to chatRoom.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'chatRoomCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/chatRooms', function() {

    it('should route to chatRoom.controller.create', function() {
      routerStub.post
        .withArgs('/', 'chatRoomCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/chatRooms/:id', function() {

    it('should route to chatRoom.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'chatRoomCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/chatRooms/:id', function() {

    it('should route to chatRoom.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'chatRoomCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/chatRooms/:id', function() {

    it('should route to chatRoom.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'chatRoomCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
