angular.module('app.todo', [])

    .controller('TodoCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, ScrumlogService, AuthService, $ionicListDelegate, $ionicNavBarDelegate) {
        $scope.canSwipe = true;
        $scope.publicTodos = [];
        $scope.todos = [];

        $scope.complete = function (todo, index) {
            $ionicListDelegate.closeOptionButtons();
            $scope.todos.splice(index, 1);
            //console.log(todo);
            var data = {
                scrumlog_ID: todo.Scrumlog_ID
            }
            ScrumlogService.completeTodo(data);
            $state.go('tab-teacher.todo');
        }


        $scope.getAllComments = function () {
            
            ScrumlogService.getAllTodos(AuthService.user.Teacher_ID).success(function (data) {
                $scope.publicTodos = [];
                $scope.todos = [];
                // $scope.todos = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Teacher_ID == '11' || data[i].Radio_Help == '11') {
                        $scope.publicTodos.push(data[i]);
                    }
                    else {
                        $scope.todos.push(data[i]);
                    }
                }


            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            })
        }

        $scope.comment = {};
        $scope.submitComment = function () {
            var data = {
                teacher: $scope.comment.teacher,
                text: $stateParams.comment,
                scrumlog: $stateParams.id
            };
            ScrumlogService.submitComment(data);
            $state.go('tab-teacher.todo');
        }

        function getAllTeachers() {
            show();
            ScrumlogService.getAllTeachers().success(function (data) {
                $scope.teachers = data;
                $scope.comment.teacher = data[0].Teacher_ID;
                hide();
            })
        }

        function show() {
            $ionicLoading.show({
                template: 'Laden...'
            });
        };

        function hide() {
            $ionicLoading.hide();
        };

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            $scope.getAllComments();
            
        })

        $scope.getAllComments();

        //$ionicNavBarDelegate.showBackButton(false);
    })