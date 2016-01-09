(function(angular, undefined) {
'use strict';

angular.module('oneWorldApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','moderator','admin']})

;
})(angular);