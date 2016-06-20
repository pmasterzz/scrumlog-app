angular.module('app.todo-detail', [])

    .controller('TodoDetailCtrl', function ($scope, $state, $ionicPopup, ScrumlogService, $stateParams, $ionicLoading) {
        $scope.todo = $stateParams.todo;
        $scope.comment = { text: $scope.todo.Remark };

        $scope.complete = function (todo) {
            var data = {
                scrumlog_ID: todo.Scrumlog_ID,
                comment: $scope.comment.text
            }
            ScrumlogService.completeTodo(data);
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

        //$scope.comment = {};
        $scope.submitComment = function () {
            var data = {
                teacher: $scope.comment.teacher,
                text: $scope.comment.text,
                scrumlog: $stateParams.todo.Scrumlog_ID
            };

            console.log(data);
            
            ScrumlogService.submitComment(data);
            $state.go('tab-teacher.todo');
        }

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            getAllTeachers();
            
        })
    });