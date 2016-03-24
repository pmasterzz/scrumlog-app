angular.module('app.interceptorService', [])

.factory('myInterceptor', function ($window) {
    var requestInterceptor = {
        request: function (config) {
            
            if ($window.localStorage.token && config.url !== 'https://api.imgur.com/3/g/memes/top') {
                config.headers['Token'] = $window.localStorage.token;
            }
            return config;
        }
    }
    return requestInterceptor;
    })