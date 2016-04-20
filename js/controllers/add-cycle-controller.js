angular.module('app.add-cycle', [])

.controller('AddCycleCtrl', function ($scope, CycleService, $state, $filter, $ionicPopup, $stateParams) {
    $scope.cycle = {
        Start_Date: new Date(),
        End_Date: new Date()
    };

    $scope.addCycle = function () {


        $scope.cycle.Start_Date = $filter('date')($scope.cycle.Start_Date, "yyyy-MM-dd");
        $scope.cycle.End_Date = $filter('date')($scope.cycle.End_Date, "yyyy-MM-dd");
        
      

        var collide = checkCollidingCycle($scope.cycle);
        if (collide.success === true) {
            CycleService.addCycle($scope.cycle).success(function (data) {
                CycleService.cycleList.push($scope.cycle);
                $state.go('tab-teacher.cycle');
            })
        }
        else {
            showAlert(collide.message);
        }
    }

    $scope.updateCycle = function(){
        //$scope.cycle.Start_Date = $filter('date')($scope.cycle.Start_Date, "yyyy-MM-dd");
        //$scope.cycle.End_Date = $filter('date')($scope.cycle.End_Date, "yyyy-MM-dd");  
        
        var start = new Date($scope.cycle.Start_Date);
        start = $filter('date')(start, "yyyy-MM-dd");
        
        var end = new Date($scope.cycle.End_Date);
        end = $filter('date')(end, "yyyy-MM-dd");
        
        
        $scope.cycle.Start_Date = start;   
        
        $scope.cycle.End_Date = end;  

        var collide = checkCollidingCycle($scope.cycle);
        if(collide.success === true){
            CycleService.updateCycle($scope.cycle).success(function(data){

                var cycleIndex;
                CycleService.cycleList.some(function(entry, i){
                    if(entry.Cycle_ID === $scope.cycle.Cycle_ID){
                        cycleIndex = i;
                        return true;
                    }
                })

                //var cycleIndex = CycleService.cycleList.findIndex(x => x.Cycle_ID==$scope.cycle.Cycle_ID);
                CycleService.cycleList.splice(cycleIndex, 1);
                CycleService.cycleList.push($scope.cycle);
                $state.go('tab-teacher.cycle',{}, {reload: true});
            })
        }
        else{
            showAlert(collide.message);
        }

    }

    $scope.updateOrAdd = function(){
        if($scope.buttonText === 'Wijzigen')
            $scope.updateCycle();
        else
            $scope.addCycle();
    }

    function checkCollidingCycle(cycle){
        var message='';
        var success=true;

        //check for colliding cycles
        for (var i = 0; i < CycleService.cycleList.length; i++) {
            if(cycle.Start_Date >= CycleService.cycleList[i].Start_Date &&
                cycle.Start_Date <= CycleService.cycleList[i].End_Date && cycle.Cycle_ID !== CycleService.cycleList[i].Cycle_ID) {             
                success = false;
                message = 'Deze Cyclus overlapt met een andere cyclus. Pas de begin/eind datum aan.';
            }
            else if($scope.cycle.End_Date >= CycleService.cycleList[i].Start_Date &&
                cycle.End_Date <= CycleService.cycleList[i].End_Date && cycle.Cycle_ID !== CycleService.cycleList[i].Cycle_ID) {
                success = false;
                message = 'Deze Cyclus overlapt met een andere cyclus. Pas de begin/eind datum aan.';
            }
            else if (cycle.Number == CycleService.cycleList[i].Number && cycle.Cycle_ID != CycleService.cycleList[i].Cycle_ID) {
                success = false;
                message = 'Het nummer van de cyclus is al in gebruik';
            }
        }

        return {
            success: success,
            message: message
        }

    }

    function showAlert(message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Cyclus',
            template: message
        });
    }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        if ($stateParams.cycle != null) {
            //$scope.cycle = $stateParams.cycle;
            $scope.cycle = {
                Cycle_ID: $stateParams.cycle.Cycle_ID,
                Start_Date: new Date($stateParams.cycle.Start_Date),
                End_Date: new Date($stateParams.cycle.End_Date),
                Number: $stateParams.cycle.Number
            }
            $scope.buttonText = 'Wijzigen';
        } else {
            $scope.buttonText = 'Toevoegen';
        }
    })
})