'use strict';

angular.module('oneWorldApp', [
  'oneWorldApp.auth',
  'oneWorldApp.admin',
  'oneWorldApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'uiGmapgoogle-maps'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
