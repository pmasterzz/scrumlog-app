angular.module('app.todo-detail', [])

.controller('TodoDetailCtrl', function ($scope, $state, $ionicPopup, ScrumlogService, $stateParams) {
    $scope.todo = $stateParams.todo;
    $scope.comment={text: $scope.todo.Remark};
    
    $scope.complete = function(todo){
        var data = {
            scrumlog_ID: todo.Scrumlog_ID,
            comment: $scope.comment.text
        }
        ScrumlogService.completeTodo(data);
        $state.go('tab-teacher.todo');
    }
});