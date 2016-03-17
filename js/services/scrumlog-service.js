angular.module('app.scrumlogService', [])

.factory('ScrumlogService', function ($http, $window) {

    var service = {
        submit: submit,
        getAllTeachers: getAllTeachers,
        getScrumlog:getScrumlog
    }
    return service;

    function submit(data) {
        return $http.post('http://localhost:8080/api/submitScrumlog?token=' + $window.localStorage.token, data);
    }

    function getAllTeachers() {
        return $http.get('http://localhost:8080/api/getAllTeachers?token=' + $window.localStorage.token);
    }

    function getScrumlog(date, student_ID) {
        return $http.get('http://localhost:8080/api/getScrumlog?date=' + date + '&student_id=' + student_ID + '&token=' + $window.localStorage.token);
    }


})