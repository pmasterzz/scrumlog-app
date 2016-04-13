angular.module('app.reviewStudent', [])

.controller('ReviewScrumStudentCtrl', function ($scope, $stateParams) {
    $scope.scrumlog = $stateParams.scrumlog;
})