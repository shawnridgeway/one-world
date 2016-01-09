'use strict';

describe('Directive: chatMessage', function () {

  // load the directive's module and view
  beforeEach(module('oneWorldApp'));
  beforeEach(module('app/directives/chatMessage/chatMessage.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chat-message></chat-message>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the chatMessage directive');
  }));
});
