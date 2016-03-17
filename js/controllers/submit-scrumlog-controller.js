angular.module('app.submitScrumlog', [])

.controller('SubmitScrumlogCtrl', function ($scope, AuthService, ScrumlogService) {
    var vm = this;
    var user = AuthService.getUser();
    
    console.log(user);
    getAllTeachers();
    
   /* ScrumlogService.getAllTeachers().success(function (data) {
        $scope.teachers = data.teachers;
        console.log($scope.teachers);
    })*/


           
    function getAllTeachers() {
        ScrumlogService.getAllTeachers().success(function (data) {
            $scope.teachers = data.teachers;
            
        })
    }

    $scope.submitScrumlog = function(scrumlog) {
        console.log('in function');
        var student = AuthService.getUser();
        var data = {
            scrumlog: scrumlog,
            student: student
        }
        console.log(data);
        ScrumlogService.submit(data).success(function (data) {
            console.log('submitted :)');
        })
        alert('you posted it m9');
    }
    
})