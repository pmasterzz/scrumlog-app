angular.module('app.authService', [])

.factory('AuthService', function ($http, $window, api) {

    var service = {
        user: {},
        setUser: setUser,
        getUser: getUser,
        login: login,
        checkToken: checkToken
}
    return service;

    function setUser(user) {
        console.log('in function'); 
        this.user = user;
    }
    function getUser() {
        return this.user;
    }

    function login(data) {
        return $http({
            method: 'POST',
            url: api + '/api/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: data
        })

        //return $http.post('http://localhost/Zee/index.php/api/login', data);
    }
    function checkToken(data) {
        return $http.post('http://localhost:8080/api/checkToken?token=' + $window.localStorage.token, data);
    }
})