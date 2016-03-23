angular.module('app.tab', [])

.controller('TabController', function ($scope, AuthService, $window, $state, $ionicPopup) {
    
    

    /*$scope.logout = function () {
        var user = AuthService.getUser();
        var data = {
            Person_ID: user.Person_ID
        };
        AuthService.logout(data).success(function (wha) {
            
        })
        $window.localStorage.clear();
        $state.go('login');
    }*/
})