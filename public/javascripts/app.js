'use strict';

angular.module('practiceApp', [
  'ngRoute',
  'board',
  'createBoard'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/board'});
}]);