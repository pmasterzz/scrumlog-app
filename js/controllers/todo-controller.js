angular.module('app.todo', [])

    .controller('TodoCtrl', function ($scope, $state, $ionicPopup, ScrumlogService, AuthService, $ionicListDelegate, $ionicNavBarDelegate) {
        $scope.canSwipe = true;
        $scope.publicTodos = [];
        $scope.todos = [];

        $scope.complete = function (todo, index) {
            $ionicListDelegate.closeOptionButtons();
            $scope.todos.splice(index, 1);
            console.log(todo);
            var data = {
                scrumlog_ID: todo.Scrumlog_ID
            }
            ScrumlogService.completeTodo(data);
            $state.go('tab-teacher.todo');
        }


        $scope.getAllComments = function () {
            console.log(AuthService.user);
            ScrumlogService.getAllTodos(AuthService.user.Teacher_ID).success(function (data) {
                $scope.publicTodos = [];
                $scope.todos = [];
               // $scope.todos = data;
                for (var i = 0; i<data.length; i++){
                    if(data[i].Teacher_ID == '11' || data[i].Radio_Help == '11')
                    {
                        $scope.publicTodos.push(data[i]);
                    }
                    else{
                        $scope.todos.push(data[i]);
                    }
                }
                
            
		}).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                })
        }

        $scope.getAllComments();

        //$ionicNavBarDelegate.showBackButton(false);
    })