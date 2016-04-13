angular.module('app.cycleService', [])

.factory('CycleService', function ($http, api) {
    var service = {
        cycleList : [],
        addCycle: addCycle,
        deleteCycle: deleteCycle,
        updateCycle: updateCycle
    }

    return service;

    function addCycle(data) {
        return $http({
            method: 'POST',
            url: api + '/api/cycle',
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

    function deleteCycle(data) {
        return $http({
            method: 'POST',
            url: api + '/api/deleteCycle',
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

    function updateCycle(data){
       return $http({
            method: 'POST',
            url: api + '/api/updateCycle',
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