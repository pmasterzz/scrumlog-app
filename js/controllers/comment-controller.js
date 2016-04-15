angular.module('app.comment', [])

.controller('CommentCtrl', function ($scope, $state, $ionicLoading, $stateParams, ScrumlogService, $ionicHistory) {

	//getAllTeachers();
	$scope.comment = {};
	$scope.submitComment = function(){
		var data = {
			teacher: $scope.comment.teacher,
            text: $stateParams.comment,
			scrumlog: $stateParams.id
		};
        ScrumlogService.submitComment(data);
        $state.go('tab-teacher.todo');
	}

	function getAllTeachers(){
		show();
		ScrumlogService.getAllTeachers().success(function(data){
			$scope.teachers = data;
			$scope.comment.teacher =  data[0].Teacher_ID;
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
    	getAllTeachers();
    })

})