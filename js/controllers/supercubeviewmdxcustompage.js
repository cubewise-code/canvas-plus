app.controller('supercubeviewmdxcustompageCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$transitions','$location', '$timeout', 'globals','$window', 
function($scope, $rootScope, $log, $tm1Ui, $transitions,$location, $timeout, globals, $window) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    $scope.cubesAvailable = [];
    $scope.cubesViewsAvailable = [];
    $scope.cubeNUrlValue = decodeURI($location.search()['cubeName']);
    
    if($scope.cubeNUrlValue  != null && $scope.cubeNUrlValue != 'undefined'){
        $scope.activeCubeName = decodeURI($location.search()['cubeName']);
    }else{
        $scope.activeCubeName = $scope.cubeName;
    }
 

    
    $scope.dimensionalityArray = [];
    $scope.currentDeminsionAttributes = [];
    $scope.aliasOverName = [];
    $scope.showDimensionality = true;
     

    $tm1Ui.cubes($scope.tm1Instance).then( function(cubedata){
        if(cubedata){
            $scope.cubesAvailable = cubedata;
           // console.log("CUSOM CUBEVIEW JS",$scope.cubesAvailable);
        }
    });
 
}]);