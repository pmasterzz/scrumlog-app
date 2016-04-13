angular.module('app.cycle', [])

.controller('CycleCtrl', function ($scope, $ionicLoading, ScrumlogService, CycleService, $ionicPopup, $filter) {

    getAllCycles();

    function getAllCycles() {
        show();
        ScrumlogService.getAllCycles().success(function (data) {
            CycleService.cycleList = data;
            $scope.cycles = data;
            angular.forEach($scope.cycles, function(cycle){
                cycle.Number = parseFloat(cycle.Number);
               
            })
            $scope.cycles = $filter('orderBy')($scope.cycles, 'Number');
            hide();
        })
    }

    function show () {
        $ionicLoading.show({
            template: 'Laden...'
        });
    };
    function hide() {
        $ionicLoading.hide();
    }

    function deleteCycle (id, index) {
        var data = { cycle_ID: id };
        show();
        CycleService.deleteCycle(data).success(function (data) {
            hide();
            if (!data.Success) {
                showAlert();
            }
            else {
                CycleService.cycleList.splice(index, 1);
                $scope.cycles.splice(index, 1);
            }
        });

    }

    $scope.showConfirm = function (id, index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Verwijderen cyclus',
            template: 'Weet je zeker dat je deze cyclus wilt verwijderen?',
            buttons: [{
                text: 'Verwijderen', type: 'button-positive', onTap: function (e) {
                    deleteCycle(id, index);
                }
            }, { text: 'Annuleren', type: 'button-assertive' }]
        });
    };

    function showAlert() {
        var alertPopup = $ionicPopup.alert({
            title: 'Cyclus',
            template: 'Er zijn opdrachten en/of scrumlogs met in deze cyclus. Verwijder eerst de opdrachten/scrumlogs om deze cyclus te kunnen verwijderen.'
        });
    }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        if(CycleService.cycleList.length > 0){
            $scope.cycles = CycleService.cycleList;
            angular.forEach($scope.cycles, function(cycle){
                cycle.Number = parseFloat(cycle.Number);
            })
            $scope.cycles = $filter('orderBy')($scope.cycles, 'Number');
        }

        

    })

})