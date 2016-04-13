angular.module('app.comment', [])

.controller('CommentCtrl', function ($scope, $state, $ionicLoading, $stateParams, ScrumlogService, $ionicHistory) {

	//getAllTeachers();
	$scope.comment = {};
    console.log($stateParams);
	$scope.submitComment = function(){
		var data = {
			text: $scope.comment.text,
			teacher: $scope.comment.teacher,
			scrumlog: $stateParams.scrumlog.Scrumlog_ID
		};
        ScrumlogService.submitComment(data);
        $state.go('tab-teacher.scrumlog-detail', {scrumlog: JSON.stringify($stateParams.scrumlog)});
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