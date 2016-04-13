angular.module('app.todo', [])

.controller('TodoCtrl', function ($scope, $state, $ionicPopup, ScrumlogService, AuthService, $ionicListDelegate) {
    $scope.canSwipe = true;
    
    $scope.complete = function(todo, index){
        $ionicListDelegate.closeOptionButtons();  
        $scope.todos.splice(index, 1);
        console.log(todo);
        var data = {
            scrumlog_ID: todo.Scrumlog_ID
        }
        ScrumlogService.completeTodo(data);
    }
	
	
	$scope.getAllComments = function(){
		ScrumlogService.getAllTodos(AuthService.user.Teacher_ID).success(function(data){
			$scope.todos = data;
            
		}).finally(function(){
            $scope.$broadcast('scroll.refreshComplete');
        })
	}
    $scope.getAllComments();
})