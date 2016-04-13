angular.module('app.scrumlogDetail', [])

.controller('ScrumlogDetailCtrl', function ($scope, $stateParams) {

    $scope.scrumlog = JSON.parse($stateParams.scrumlog);

    $scope.hasComment = true;

    if($scope.scrumlog.Remark === null){
    	$scope.hasComment = false;
    }
    else{
    	$scope.hasComment = true;
    }
})