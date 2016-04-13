angular.module('app.todo-detail', [])

.controller('TodoDetailCtrl', function ($scope, $state, $ionicPopup, ScrumlogService, $stateParams) {
    $scope.todo = $stateParams.todo;
    
});