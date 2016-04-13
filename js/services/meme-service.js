angular.module('app.memeService', [])

.factory('MemeService', function ($http) {

    var service = {
        getRandomMeme: getRandomMeme
    }

    return service;

    function getRandomMeme() {
        return $http({
            method: 'GET',
            url: 'https://api.imgur.com/3/g/memes/top',
            headers: {
                'Authorization': 'Client-ID c0372e23ad49467'
            },
            cache: true
        });
    }
})