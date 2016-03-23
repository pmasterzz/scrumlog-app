angular.module('app.scrumlog', [])

.controller('ScrumlogCtrl', function ($scope, AuthService, ScrumlogService, $filter, $state,
    $ionicLoading, $ionicPopup) {
    var vm = this;
    vm.getScrumlog = getScrumlog;
    vm.date = new Date();
    vm.scrumlog = ScrumlogService.getCurrentScrumlog();
    
    function getScrumlog() {
        var date = $filter('date')(vm.date  , "yyyy-MM-dd");        
        var student = AuthService.getUser();
        vm.scrumDate = date;
        $scope.show();
        ScrumlogService.getScrumlog(date, student.Student_ID).success(function (data) {
            if (data.Success !== false) {
                vm.scrumlog = data[0];
                ScrumlogService.setCurrentScrumlog(vm.scrumlog);
                $scope.hide();
                $state.go('tab.scrumlog');
            }
            else {
                $scope.hide();
                $scope.showAlert();
            }
        })

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
            title: 'Scrumlog',
            template: 'Er is geen scrumlog gevonden.'
        });
    }

})