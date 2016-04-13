angular.module('app.student-list', [])

.controller('StudentListCtrl', function ($scope, $state,
    $ionicLoading, $ionicPopup, $stateParams, TableService) {

    $scope.studentList = [];

    function getAllAvailableStudents() {
        var data = { table: $stateParams.table };
        TableService.getAllAvailableStudents(data).success(function (data) {
            for (var i = 0; i < data.length; i++) {
                var enabled = false;
                if (data[i].Seating == $stateParams.table)
                    enabled = true;
                $scope.studentList.push({
                    name: data[i].Firstname + ' ' + data[i].Lastname,
                    id: data[i].Student_ID,
                    enabled: enabled 
                });
            }
        })
    }

    $scope.setTable = function () {
        var studentArray = [];

        for (var i = 0; i < $scope.studentList.length; i++) {
            if ($scope.studentList[i].enabled === true)
                studentArray.push($scope.studentList[i].id);
        }
        var data = {
            studentArray: studentArray,
            seating: $stateParams.table
        }
        TableService.setTable(data).success(function (data) {
            $state.go('tab-teacher.tab-table');
        })
    }
    getAllAvailableStudents();
})