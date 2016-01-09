'use strict';

angular.module('oneWorldApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('main.forum', {
        url: '/forum'
      })
      .state('main.chat', {
        url: '/chat',
        authenticate: true
      })
  });
