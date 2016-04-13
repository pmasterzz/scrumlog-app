angular.module('app.scrumlog-list', [])

.controller('ScrumlogListCtrl', function ($scope, ScrumlogService, $state,
    $ionicLoading, $ionicPopup, $stateParams) {

    $scope.scrumlogList = JSON.parse($stateParams.scrumlogList);

    $scope.showDetails = function (scrumlog) {
        $state.go('tab-teacher.scrumlog-detail', { scrumlog: JSON.stringify(scrumlog) });
    }
})