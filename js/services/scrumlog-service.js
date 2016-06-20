angular.module('app.scrumlogService', [])

.factory('ScrumlogService', function ($http, $window, api) {
    //random cmment
    var service = {
        submit: submit,
        getAllTeachers: getAllTeachers,
        getScrumlog: getScrumlog,
        currentScrumlog: {},
        getCurrentScrumlog: getCurrentScrumlog,
        setCurrentScrumlog: setCurrentScrumlog,
        getAllStudents: getAllStudents,
        getAllCycles: getAllCycles,
        submitComment: submitComment,
        getAllTodos: getAllTodos,
        completeTodo: completeTodo,
        getLatestScrumlogs: getLatestScrumlogs
    }
    return service;

    function getCurrentScrumlog() {
        return this.currentScrumlog;
    }

    function setCurrentScrumlog(data) {
        this.currentScrumlog = data;
    }

    function submit(data) {
       return $http({
            method: 'POST',
            url: api + '/api/submitScrumlog',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data
        })
    }

    function getAllTeachers() {
        return $http.get(api + '/api/getAllTeachers');
    }

    function getScrumlog(filter) {
        return $http.get(api + '/api/scrumlog?date=' + filter.date + '&student_ID=' + filter.student_ID + '&year=' + filter.year + '&cycle_ID=' + filter.cycle_ID + '&seating=' + filter.seating);
    }

    function getAllStudents() {
        return $http.get(api + '/api/getAllStudents');
    }

    function getAllCycles(){
        return $http.get(api + '/api/getAllCycles');
    }

    function submitComment(data){
        return $http({
            method: 'POST',
            url: api + '/api/submitComment',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data
        })
    }

    function getAllTodos(data){
        return $http.get(api + '/api/getAllTodos?teacher_ID=' + data);
    }
    
    function getLatestScrumlogs(id) {
        return $http.get(api + '/api/getLatestScrumlogs?id=' + id);
    }
    
    function completeTodo(data){
        return $http({
            method: 'PUT',
            url: api + '/api/completeTodo',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data
        })
    }

})