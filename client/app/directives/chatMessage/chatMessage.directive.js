'use strict';

angular.module('oneWorldApp')
  .directive('chatmessage', function () {
    return {
      templateUrl: 'app/directives/chatMessage/chatMessage.html',
      restrict: 'EA',
      transclude: true,
      replace: true,
      link: function (scope, element, attrs) {
      	
      },
      controller: function($scope) {
      }
    };
  });
