angular.module('app.scrumlog', [])

.controller('ScrumlogCtrl', function ($scope, AuthService, ScrumlogService, $filter, $state,
    $ionicLoading, $ionicPopup, USER_ROLES) {
    
    $scope.selectedDate = new Date();
    $scope.currentYear = new Date().getFullYear();
    $scope.cycles = [];
    $scope.scrumlog = {};
    
    
    $scope.filter = {
        year: 'undefined'
    };
    $scope.tables = [1, 2, 3, 4, 5, 6, 7];
    //vm.scrumlog = ScrumlogService.getCurrentScrumlog();

    if (AuthService.role === USER_ROLES.teacher)
        getAllStudents();
    
    $scope.getScrumlogStudent = function (selectedDate) {
        $scope.show();
        var filter = {};
        filter.date = $filter('date')(selectedDate, "yyyy-MM-dd");
        var student = AuthService.getUser();
        filter.student_ID = student.Student_ID;
        ScrumlogService.getScrumlog(filter).success(function (data) {
            if (data.Success !== false) {
                $scope.scrumlog = data[0];
                $scope.hide();
                $state.go('tab.scrumlog', {scrumlog: $scope.scrumlog});
            }
            else {
                $scope.hide();
                $scope.showAlert();
            }
        })

    }

    $scope.getScrumlogTeacher = function (filter, date) {
        $scope.show();
        filter["date"] = $filter('date')(date, "yyyy-MM-dd");
        ScrumlogService.getScrumlog(filter).success(function (data) {
            if(data.Success !== false)
            {
                $scope.hide();
                $state.go('tab-teacher.scrumlog-list', { scrumlogList: JSON.stringify(data) });
            }
            else {
                $scope.hide();
                $scope.showAlert();
            }
                    
        });

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
    function getAllStudents() {
        ScrumlogService.getAllStudents().success(function (data) {
            $scope.students = data;
        })
    }

    //$scope.getAllCycles();

})