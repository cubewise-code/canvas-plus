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
    $scope.rowDimensionArray = [];
    $scope.columnDimensionArray = [];
    $scope.tilesDimensionArray = [];
    $scope.filtersDimensionArray = [];
    $scope.allowDrop= function (ev) {
        ev.preventDefault();
    };

  $scope.drag=  function (ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
    };

  $scope.drop=  function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        console.log("Drop : Dimension",data, "on ", ev.target.getAttribute('id'))
        if(($scope.rowDimensionArray).indexOf(data) === -1){
             
        }else{
            $scope.rowDimensionArray.splice(($scope.rowDimensionArray).indexOf(data), 1);
        }
        if(($scope.filtersDimensionArray).indexOf(data) === -1){
             
        }else{
            $scope.filtersDimensionArray.splice(($scope.filtersDimensionArray).indexOf(data), 1);
        }
         
        if(($scope.columnDimensionArray).indexOf(data) === -1){
            
        }else{
            $scope.columnDimensionArray.splice(($scope.columnDimensionArray).indexOf(data), 1);
        }
        if(($scope.tilesDimensionArray).indexOf(data) === -1){
          
        }else{
            $scope.tilesDimensionArray.splice(($scope.tilesDimensionArray).indexOf(data), 1);
        }
        if(ev.target.getAttribute('id') === 'row'){
            if(($scope.rowDimensionArray).indexOf(data) === -1){
                $scope.rowDimensionArray.push(data);
            }else{
                //$scope.rowDimensionArray.splice(($scope.rowDimensionArray).indexOf(data), 1);
            }
             
        }else{
            if(ev.target.getAttribute('id') === 'col'){
               
                if(($scope.columnDimensionArray).indexOf(data) === -1){
                    $scope.columnDimensionArray.push(data);
                }else{
                    $scope.columnDimensionArray.splice(($scope.columnDimensionArray).indexOf(data), 1);
                }
            }else{
                if(ev.target.getAttribute('id') === 'tiles'){
                    
                    if(($scope.tilesDimensionArray).indexOf(data) === -1){
                        $scope.tilesDimensionArray.push(data);
                    }else{
                        $scope.tilesDimensionArray.splice(($scope.tilesDimensionArray).indexOf(data), 1);
                    }
                }else{
                    if(ev.target.getAttribute('id') === 'filters'){
                    
                        if(($scope.filtersDimensionArray).indexOf(data) === -1){
                            $scope.filtersDimensionArray.push(data);
                        }else{
                            $scope.filtersDimensionArray.splice(($scope.filtersDimensionArray).indexOf(data), 1);
                        }
                    }
                }
                
            }  
        }
        
        //ev.target.appendChild(document.getElementById(data));
        window.dispatchEvent(new Event('resize')); 
        console.log($scope.tilesDimensionArray, $scope.columnDimensionArray,  $scope.rowDimensionArray, $scope.filtersDimensionArray)
         var collectTilesMdxString = '';
         var collectFiltersMdxString = '';
         var collectRowMdxString = '';
         var collectColumnMdxString = '';
        for(var tthh = 0; tthh < $scope.tilesDimensionArray.length; tthh++){
           if(collectTilesMdxString === ''){
                collectTilesMdxString = "["+$scope.tilesDimensionArray[tthh]+"].&[]"
           }else{
                collectTilesMdxString =  collectTilesMdxString + ", ["+$scope.tilesDimensionArray[tthh]+"].&[]";
           }
           
        }
        for(var tth = 0; tth < $scope.columnDimensionArray.length; tth++){
            if(collectColumnMdxString === ''){
                collectColumnMdxString = "TM1SubsetToSet(["+$scope.columnDimensionArray[tth]+"], \"Default\")"
           }else{
            collectColumnMdxString =  collectColumnMdxString + "* TM1SubsetToSet(["+$scope.columnDimensionArray[tth]+"], \"Default\")";
           }
           
        }
        for(var thh = 0; thh < $scope.rowDimensionArray.length; thh++){
            if(collectRowMdxString === ''){
                collectRowMdxString = "TM1SubsetToSet(["+$scope.rowDimensionArray[thh]+"], \"Default\")"
           }else{
            collectRowMdxString =  collectRowMdxString + "* TM1SubsetToSet(["+$scope.rowDimensionArray[thh]+"], \"Default\")";
           }
           
        }
        for(var th = 0; th < $scope.filtersDimensionArray.length; th++){
            if(collectFiltersMdxString === ''){
                collectFiltersMdxString = "["+$scope.filtersDimensionArray[th]+"].&[]"
            }else{
                collectFiltersMdxString = collectFiltersMdxString+ ", ["+$scope.filtersDimensionArray[th]+"].&[]"
            }
        }

        $rootScope.mdxString =  "SELECT { "+collectColumnMdxString+" } ON COLUMNS, { "+collectRowMdxString+" } ON ROWS FROM ["+$rootScope.cubeName+"] WHERE ("+collectTilesMdxString+", "+collectFiltersMdxString+")";
    };
  
    $scope.openElementModal = function(dimensionName){
       $rootScope.dimensionSelectedToEdit  = dimensionName;

        $("#dimensionEditor").modal("show")
    }
    $scope.cubeDimensionalityArray = [];
    $rootScope.dimensionElementsArray = [];
    $scope.formatMdxStringCube = function(cube){ 
        if($scope.showCubeList){
            $scope.showCubeList = !$scope.showCubeList;
        }
        $rootScope.dimensionElementsArray = [];
         $scope.mdxStringCube =  cube;
         $scope.activeCubeName = cube;
         $scope.openDimensionElements = [];
         $tm1Ui.cubeDimensions($scope.tm1Instance, cube).then(function(result){
            if(!result.failed){ 
                console.log("cubeNameChanged Dimensions to load",  result);
                //$scope.cubeDimensionalityArray = result;
                $scope.rowDimensionArray = [];
                $scope.columnDimensionArray = [];
                 
                $scope.filtersDimensionArray = [];
                $scope.tilesDimensionArray = result;
                $rootScope.mdxString =  "SELECT { } ON COLUMNS, { } ON ROWS FROM ["+$scope.activeCubeName+"] WHERE ()";

                for(var kkd = 0; kkd < result.length; kkd++){
                    $tm1Ui.dimensionElements($scope.tm1Instance, result[kkd] ).then(function(resultEl){
                      if(resultEl){
                        var dim = (((resultEl[0]['UniqueName']).split('.')[0]).split('[').join('')).split(']').join('')
                         $rootScope.dimensionElementsArray[dim] =  resultEl;
                         console.log("elements : ",   $rootScope.dimensionElementsArray ,"for dimension" );

                      }
                    
                     
                    })
                }
               
              
               
                //$rootScope.mdxString = "SELECT {[Period].[Year], [Period].[Jan], [Period].[Feb], [Period].[Mar], [Period].[Apr], [Period].[May], [Period].[Jun], [Period].[Jul], [Period].[Aug], [Period].[Sep], [Period].[Oct], [Period].[Nov], [Period].[Dec]} ON COLUMNS, {TM1DRILLDOWNMEMBER( {[Account].[Net Income]}, ALL, RECURSIVE )} ON ROWS FROM ["+$rootScope.cubeName+"] WHERE ([Year].&[2018], [Region].&[England], [General Ledger Measure].&[Amount], [Currency].&[Local], [Version].&[Budget], [Department].&[Corporate])" 
    
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