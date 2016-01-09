'use strict';

describe('Service: forumService', function () {

  // load the service's module
  beforeEach(module('oneWorldApp'));

  // instantiate service
  var forumService;
  beforeEach(inject(function (_forumService_) {
    forumService = _forumService_;
  }));

  it('should do something', function () {
    expect(!!forumService).toBe(true);
  });

});
