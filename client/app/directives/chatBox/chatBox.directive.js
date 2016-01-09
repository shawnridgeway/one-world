'use strict';

angular.module('oneWorldApp')
  .directive('chatbox', function () {
    return {
      templateUrl: 'app/directives/chatBox/chatBox.html',
      restrict: 'E',
      replace: true,
      scope: {
        messages: '='
      },
      conroller: 'ChatBoxCtrl'
      // link: function (scope, element, attrs) {
      // 	var messages = ['Hey', 'Whats up?'];

      // 	scope.addMessage = function(message) {
      // 		//scope.rearange();
      // 		messages.push(message);
      // 	};

      // 	// scope.rearange = function() {
      // 	// 	for (var i = messages.length - 1; i >= 0; i--) {
      // 	// 		messages[i].set('offsetY', messages[i].get('offsetY') + 22);
      // 	// 	};
      // 	// };

      // 	scope.removeMessage = function() {
      // 		messages.shift();
      // 	}
      // }
    };
  });
