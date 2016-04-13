angular.module('app.authService', [])

.factory('AuthService', function ($http, $window, api, USER_ROLES) {

    var service = {
        user: {},
        setUser: setUser,
        getUser: getUser,
        login: login,
        checkToken: checkToken,
        logout: logout,
        isAuthenticated : false,
        role : '',
        isAuthorized: isAuthorized
    }


    return service;

    function setUser(user) {
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
    }
    function checkToken() {
        return $http({
            method: 'GET',
            url: api + '/api/checkToken?token=' + $window.localStorage.token
        })
    }
    function logout(data) {
        return $http({
            method: 'POST',
            url: api + '/api/logout',
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

    function isAuthorized(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles]
        }
        return (this.isAuthenticated && authorizedRoles.indexOf(this.role) !== -1);
    }
})