'use strict';

angular.module('board', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/board', {
      templateUrl: 'views/board.html',
      controller: 'BoardCtrl'
    })
  }])
  .controller('BoardCtrl', ['$http', '$location', '$scope', '$route',
    function ($http, $location, $scope, $route) {

      $scope.reverse = true;
      $http.get('/board').then(function (res) {
          $scope.boards = res.data.boards;
        }, function (res) {
          $scope.err = res.data.err;
        }
      );

      $scope.edit = function (id) {
        $location.url('/createBoard/' + id);
      };

      $scope.delete = function (id) {
        $http.delete('/board', {params: {boardId: id}})
          .then(function (res) {
            alert('删除成功!');
            $route.reload();
          }, function (res) {
            console.log(res.data);
          })
      };

      $scope.orderBy = function (condition) {
        if (condition === 'createOn') {
          $scope.reverse = !$scope.reverse;
        }
      }
    }])
  .directive('breadCrumb', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/breadcrumb.html',
      scope: {}
    }
  });