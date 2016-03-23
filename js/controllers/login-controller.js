angular.module('app.login', [])

.controller('LoginCtrl', function ($scope, AuthService, $window, $state, $ionicLoading,
    $ionicPopup, USER_ROLES) {
    var vm = this;
    vm.login = login; 
        

    function login() {
        $scope.show();
        AuthService.login(vm.user).then(function (data) {
            AuthService.isAuthenticated = true;
            AuthService.user = data.data.User;
            console.log('hi');
             
            if (data.data.Userlevel === 'Student') {
                AuthService.role = USER_ROLES.student;
                $scope.student = true;
            }
            else {
                AuthService.role = USER_ROLES.teacher;
                $scope.student = false;
            }
            $window.localStorage.token = data.data.Token;
            $scope.hide();
            $state.go('tab.submit-scrumlog');
        }, function (err) {
            $scope.hide();
            $scope.showAlert();
        })
    }

    function checkToken() {
        if ($window.localStorage.token) {
            var data = {
                token: $window.localStorage.token
            }
            AuthService.checkToken(data).success(function (data) {
                if (data.success) {
                    AuthService.setUser(data.user);
                    console.log('set');
                    $state.go('tab.dash');
                    
                }
            })
        }
    }

    function logout() {
        $window.localStorage.token = '';
        AuthService.setUser({});
        $state.go('login');
    }

    $scope.show = function () {
        $ionicLoading.show({
            template: 'Laden...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    }

    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Login',
            template: 'Verkeerde gebruikersnaam/wachtwoord'
        });
    }
})