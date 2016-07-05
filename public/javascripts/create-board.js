'use strict';

angular.module('createBoard', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/createBoard', {
      templateUrl: 'views/create-board.html',
      controller: 'CreateBoardCtrl',
      resolve: {
        board: function ($route, $http) {
          return $http({
            url: '/board/' + $route.current.params.boardId,
            method: "GET"
          });
        }
      }
    }).when('/createBoard/:boardId', {
      templateUrl: 'views/create-board.html',
      controller: 'CreateBoardCtrl',
      resolve: {
        board: function ($route, $http) {
          return $http({
            url: '/board/' + $route.current.params.boardId,
            method: "GET"
          });
        }
      }
    });
  }])
  .controller('CreateBoardCtrl', ['$http', '$routeParams', '$scope', '$location', 'board',
    function ($http, $routeParams, $scope, $location, board) {
      $scope.title = 'Create';
      $scope.name = '';
      $scope.desc = '';
      $scope.ownerProp = '';
      $scope.owners = ['zhangsan', 'lisi', 'wangwu'];
      $scope.submitted = false;
      $scope.saveAndUpdate = save;

      if ($routeParams.boardId) {
        $scope.title = 'Edit';
        $scope.saveAndUpdate = update;
        $scope.name = board.data.name;
        $scope.desc = board.data.desc;
        $scope.ownerProp = board.data.owner;
      }
      
      $scope.paths = [
        {
          href: '#/board',
          aValue: 'Boards',
          value: ''
        },
        {
          href: '',
          aValue: '',
          value: $scope.title + ' Board'
        }
      ];

      function update(form) {
        $scope.submitted = true;
        var data = {
          name: $scope.name,
          desc: $scope.desc,
          owner: $scope.ownerProp,
          id: $routeParams.boardId
        };

        if (!form.$error.required) {
          $http.put('/board', {data: data})
            .then(function (res) {
              if (res.data.status === 202) {
                alert('Edit success!');
                $location.url('/board')
              }
            }, function (res) {
              if (res.data.status === 500) {
                alert('Edit failed!');
                console.log(res.err);
              }
            })
        } else {
          alert('Please fill the required information ! ');
        }

      }

      function save(form) {
        $scope.submitted = true;
        var data = {
          name: $scope.name,
          desc: $scope.desc,
          owner: $scope.ownerProp,
          createOn: new Date().format('Y-m-d H:i:s')
        };
        if (!form.$error.required) {
          $http.post('/board', {data: data})
            .then(function (res) {
              if (res.data.status === 201) {
                alert('Create success!');
                $location.url('/board')
              }
            }, function (res) {
              if (res.data.status === 500) {
                alert('Create failed!');
                console.log(res.err);
              }

            })
        } else {
          alert('Please fill the required information ! ');
        }
      }
    }]);