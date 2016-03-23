angular.module('app.scrumlogService', [])

.factory('ScrumlogService', function ($http, $window, api) {
    //random cmment
    var service = {
        submit: submit,
        getAllTeachers: getAllTeachers,
        getScrumlog: getScrumlog,
        currentScrumlog: {},
        getCurrentScrumlog: getCurrentScrumlog,
        setCurrentScrumlog: setCurrentScrumlog
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
        return $http.get(api + '/api/getTeachers');
    }

    function getScrumlog(date, student_ID) {
        return $http.get(api + '/api/scrumlog?date=' + date + '&student_ID=' + student_ID);
    }


})