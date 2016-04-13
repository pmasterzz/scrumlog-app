angular.module('app.tableService', [])

.factory('TableService', function ($http,  api) {

    var service = {
        clearAllTables: clearAllTables,
        getAllAvailableStudents: getAllAvailableStudents,
        setTable: setTable
    };

    return service;

    function clearAllTables() {
        return $http.put(api + '/api/cleanTables');
    }

    function getAllAvailableStudents(data) {
        return $http.get(api + '/api/getAllAvailableStudents?table=' + data.table);
    }

    function setTable(data) {
        return $http({
            method: 'POST',
            url: api + '/api/table',
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