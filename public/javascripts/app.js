'use strict';

angular.module('practiceApp', [
  'ngRoute',
  'board',
  'createBoard'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/board'});
  }])
  .directive('breadCrumb', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/breadcrumb.html',
      scope: {
        paths: "="
      }
    }
  });