'use strict';

angular.module('oneWorldApp.auth', [
  'oneWorldApp.constants',
  'oneWorldApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
