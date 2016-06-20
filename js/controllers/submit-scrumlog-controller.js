angular.module('app.submitScrumlog', [])

.controller('SubmitScrumlogCtrl', function ($scope, AuthService, ScrumlogService,
    $filter, MemeService, $ionicHistory) {
    $scope.filledIn = false;
    checkSubmittedScrumlog();    
              
    function getAllTeachers() {
        ScrumlogService.getAllTeachers().success(function (data) {
            $scope.teachers = data;
            
        })
    }
    function checkSubmittedScrumlog() {
        var user = AuthService.getUser();
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        var latest_scrum = $filter('date')(user.Last_Submitted_Scrumlog, 'yyyy-MM-dd');
        if (latest_scrum === today) {
            $scope.filledIn = true;
            getRandomMeme();
        }
        else {
            getAllTeachers();
        }
    }

    $scope.submitScrumlog = function(scrumlog) {
        var student = AuthService.getUser();

        var data = {
            input_Yesterday: scrumlog.input_Yesterday,
            input_Problems: scrumlog.input_Problems,
            input_Today: scrumlog.input_Today,
            input_Help: scrumlog.input_Help,
            input_Teacher: scrumlog.input_Teacher,
            seating: student.Seating,
            student_ID: student.Student_ID
        }
        
        if (data.input_Help === undefined) {
            data.input_Help = '-';
        }
        if (data.input_Teacher === undefined)
            data.input_Teacher = '-';
        if (data.input_Problems === undefined)
            data.input_Problems = '-';

        $scope.filledIn = true;
        AuthService.setScrumlog();
        var user = AuthService.getUser();
        console.log(user);
        ScrumlogService.submit(data).success(function (data) {
            getRandomMeme();
        })
        
    }

    function getRandomMeme() {
        MemeService.getRandomMeme().success(function (data) {
            var index = Math.floor(Math.random() * data.data.length);
            $scope.randomImg = data.data[index];
        })
    }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
           checkSubmittedScrumlog();
            
        })
    
})