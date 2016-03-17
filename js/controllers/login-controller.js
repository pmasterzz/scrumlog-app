angular.module('app.login', [])

.controller('LoginCtrl', function ($scope, AuthService, $window, $state) {
    var vm = this;
    vm.login = login;
    
        

    function login() {
        AuthService.login(vm.user).success(function (data) {
            if (data.Success === true) {
                $state.go('tab.dash');
                $window.localStorage.token = data.token;
                AuthService.setUser(data.user);
                
            }
            console.log(data);
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
    checkToken();
})