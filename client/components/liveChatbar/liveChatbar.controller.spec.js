'use strict';

describe('Controller: LiveChatbarCtrl', function () {

  // load the controller's module
  beforeEach(module('oneWorldApp'));

  var LiveChatbarCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LiveChatbarCtrl = $controller('LiveChatbarCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
