angular.module('app.controller', [])

.controller('AppCtrl', function ($scope, $window, AuthService, $state, USER_ROLES,
    $ionicPopup, $ionicLoading, $ionicHistory) {
    $scope.student = '';
    function checkToken() {
        if ($window.localStorage.token) {
            showLoading();
            AuthService.checkToken().success(function (data) {
                if (data.Success === true) {
                    AuthService.setUser(data.User);
                    AuthService.isAuthenticated = true;
                   
                    if (data.Userlevel === 'Student') {
                        AuthService.role = USER_ROLES.student;
                        $scope.student = true;
                    }
                    else{
                        AuthService.role = USER_ROLES.teacher;
                        $scope.student = false;
                    }
                    $scope.student = true;
                    $state.go('tab.submit-scrumlog');
                    hideLoading();
                }
                else {
                    hideLoading();
                }
            })
        }
    }
    $scope.logout = function() {
        var user = AuthService.getUser();
        var data = {
            Person_ID: user.Person_ID
        };
        AuthService.logout(data).success(function (wha) {

        })
        $window.localStorage.clear();
        //$ionicHistory.clearHistory();
        //$ionicHistory.clearCache();
        $state.go('login');
    }
    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Uitloggen',
            template: 'Weet je zeker dat je uit wilt loggen?',
            buttons: [{
                text: 'Uitloggen', type: 'button-energized', onTap: function (e) {
                    $scope.logout();
                }
            }, { text: 'Annuleren', type: 'button-assertive' }]
        });
    };
    //checkToken();
    function showLoading () {
        $ionicLoading.show({
            template: 'Laden...'
        });
    };
    function hideLoading() {
        $ionicLoading.hide();
    }
})