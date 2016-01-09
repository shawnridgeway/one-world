'use strict';

describe('Directive: loginRegister', function () {

  // load the directive's module and view
  beforeEach(module('oneWorldApp'));
  beforeEach(module('app/directives/loginRegister/loginRegister.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-register></login-register>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the loginRegister directive');
  }));
});
