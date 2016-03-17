angular.module('app.scrumlog', [])

.controller('ScrumlogCtrl', function ($scope, AuthService, ScrumlogService, $filter, $state) {
    var vm = this;
    vm.getScrumlog = getScrumlog;
    vm.date = new Date();
    
    function getScrumlog() {
        console.log(date);
        var date = $filter('date')(vm.date  , "yyyy-MM-dd");        
        var student = AuthService.getUser();
        ScrumlogService.getScrumlog(date, student.Student_ID).success(function (data) {
            console.log(data);
            vm.scrumlog = data.scrumlog;
            $state.go('tab.scrumlog');
        })

    }

})