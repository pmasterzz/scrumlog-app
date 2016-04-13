angular.module('app.table', [])

.controller('TableCtrl', function ($scope, $state, $ionicPopup, TableService, tables) {

    $scope.tables = tables;
    $scope.table = 1;

    $scope.clearAllTables = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Tafels legen',
            template: 'Weet je zeker dat je alle tafels wilt legen?',
            buttons: [{
                text: 'Ja', type: 'button-positive', onTap: function (e) {
                    TableService.clearAllTables().success(function (data) {
                        
                    })

                }
            }, { text: 'Annuleren', type: 'button-assertive' }]
        });
    };

})