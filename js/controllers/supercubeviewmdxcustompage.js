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
    $scope.changedOption = false;
    if($scope.cubeNUrlValue  != null && $scope.cubeNUrlValue != 'undefined'){
        $scope.activeCubeName = decodeURI($location.search()['cubeName']);
    }else{
        $scope.activeCubeName = $scope.cubeName;
    }
 
    $scope.mdxId = 'P&L'
    
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
    $scope.chooseCube = function(name){
        
        $timeout(
            function(){
                $scope.showCubeList = !$scope.showCubeList
                $scope.activeCubeName = name;
                $rootScope.cubeName = $scope.activeCubeName;
                 
                 
                 
            }
        )
         
    }
    $scope.focusOnMdxString = function(string){
        $scope.focusedMdxString = string;
        //console.log($scope.focusedMdxString);
    }
    $scope.findMdxStringChanged = function(){
        if($scope.mdxString === $scope.focusedMdxString){
            $scope.changedOption = false; 
        }else{
            $scope.changedOption = true; 
        }
      //  console.log($scope.changedOption, "FOCUS OUT OF TEXTFIELD");
       
    }
    $scope.focusOnMdxId = function(id){
        $scope.focusedMdxId = id;
        //console.log($scope.focusedMdxId);
    }
    $scope.findMdxIdChanged = function(id,cube){
       
                //console.log($scope.mdxId+'' , $scope.focusedMdxId+'',  cube ,"$scope.focusedMdxId$scope.focusedMdxId" );
                 
                $rootScope.mdxId =  id;
                $scope.changedIdOption = true; 
                $location.search('mdxId', id+''); 
               // $scope.activeCubeName = cube;
                //$rootScope.cubeName = null;
                $timeout(
                    function(){
                        
                        $rootScope.setMdxId(id, cube); 
                    },1000
                )       
        
      
    
    }
    $scope.allowDrop= function (ev) {
        ev.preventDefault();
    };

  $scope.drag=  function (ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
    };

  $scope.drop=  function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        
       
            ev.target.appendChild(document.getElementById(data));
     
        
    };
  
  
    $scope.cubeDimensionalityArray = [];
    $scope.formatMdxStringCube = function(cube){ 
         $scope.mdxStringCube =  cube;
         $tm1Ui.cubeDimensions($scope.tm1Instance, cube).then(function(result){
            if(!result.failed){ 
                console.log("cubeNameChanged Dimensions to load",  result);
                $scope.cubeDimensionalityArray = result;
            }
         }
         )
    }
    var path = location.pathname
    $scope.readTextFile = function(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
     
    $.getJSON("files/namedMdx.json", function(data){
        $scope.namedMdxIdArray = data;
        //console.log(data, "JSON NAMED MDX");
    })  

    
   
  
}]);