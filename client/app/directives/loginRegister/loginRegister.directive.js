'use strict';

angular.module('oneWorldApp')
  .directive('loginRegister', function () {
    return {
      templateUrl: 'app/directives/loginRegister/loginRegister.html',
      restrict: 'E',
      controller: 'loginRegisterController',
      controllerAs: 'loginRegister'
    };
  });
