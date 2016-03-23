angular.module('app.interceptorService', [])

.factory('myInterceptor', function ($window) {
    var requestInterceptor = {
        request: function (config) {
            if ($window.localStorage.token) {
                config.headers['Token'] = $window.localStorage.token;
            }
            return config;
        }
    }
    return requestInterceptor;
    })