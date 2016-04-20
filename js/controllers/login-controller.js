angular.module('app.login', [])

.controller('LoginCtrl', function ($scope, AuthService, $window, $state, $ionicLoading,
    $ionicPopup, USER_ROLES, $ionicHistory) {
    var vm = this;
    
    checkToken();
    
    
    vm.login = login;
    vm.clear = clear;
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
        
        

    function login() {
        $scope.show();
        AuthService.login(vm.user).then(function (data) {
            AuthService.isAuthenticated = true;
            AuthService.setUser(data.data.User);
            
            $window.localStorage.token = data.data.Token;          
            if (data.data.Userlevel === 'Student') {
                AuthService.role = USER_ROLES.student;
                $state.go('tab.submit-scrumlog');
            }
            else {
                AuthService.role = USER_ROLES.teacher;
                $state.go('tab-teacher.review-scrumlog-teacher');
            }
            
            $scope.hide();
            
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
                if (data.Success === true) {
                    console.log(data);
                    AuthService.setUser(data.User);
                    if(data.Userlevel === 'Student'){
                        AuthService.role = USER_ROLES.student;
                        $state.go('tab.submit-scrumlog');
                    }
                    else{
                        console.log('why?');
                        AuthService.role = USER_ROLES.teacher;
                        $state.go('tab-teacher.review-scrumlog-teacher');
                    }
                }
            })
        }
    }

    function clear() {
        $window.localStorage.clear();
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

    $scope.$on('$ionicView.beforeLeave', function (event, viewData) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
    })
    
})