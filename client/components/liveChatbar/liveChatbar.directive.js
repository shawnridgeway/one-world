'use strict';

angular.module('oneWorldApp')
  .directive('livechatbar', () => ({
    templateUrl: 'components/liveChatbar/liveChatbar.html',
    restrict: 'E',
    controller: 'LiveChatbarCtrl',
    controllerAs: 'chat',
    replace: true
  }));
