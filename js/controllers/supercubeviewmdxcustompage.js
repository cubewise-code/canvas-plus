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
    $scope.useMdxUrlValue = decodeURI($location.search()['useMdx']);
    $scope.mdxIdUrlValue = decodeURI($location.search()['mdxId']); 
    if($scope.mdxIdUrlValue != null && $scope.mdxIdUrlValue != 'undefined'     ){
  //console.log($scope.cubeNameUrlValue, "URL VALUES TRACKED" )
        $scope.mdxId  = $scope.mdxIdUrlValue; 
        
    }else{
        $scope.mdxId = 'P&L'
    }
    $scope.changedOption = false;
    if($scope.cubeNUrlValue  != null && $scope.cubeNUrlValue != 'undefined'){
        $scope.activeCubeName = decodeURI($location.search()['cubeName']);
    }else{
        $scope.activeCubeName = $scope.cubeName;
    }
    if($scope.useMdxUrlValue  != null && $scope.useMdxUrlValue != 'undefined'){
        $rootScope.useMdxNow = true;
    }else{
        $rootScope.useMdxNow = false;
    }
  //  $rootScope.cubeName = $scope.activeCubeName ;
 
     
    
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
    $scope.setUseMDX = function(){
        if($rootScope.useMdxNow === true && $rootScope.useMdxNow){
            $location.search('mdxId', null);
            $location.search('useMdx',true);

        }else{
            $location.search('useMdx',null)
        }
      
    }
    $scope.chooseCube = function(name){
        $scope.activeCubeName = name;
        $timeout(
            function(){
                $scope.showCubeList = !$scope.showCubeList
               
                $rootScope.cubeName = $scope.activeCubeName;
              
                 
                 
            },1000
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
                $location.search('cubeName', cube+''); 
                $scope.activeCubeName = cube;
                $rootScope.cubeName = cube;
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
  //console.log("Drop : Dimension",data, "on ", ev.target.getAttribute('id'))
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
        $rootScope.getDimensionalityArrays();

        
    };
    $rootScope.getDimensionalityArrays = function(){
  //console.log( $scope.tilesDimensionArray, $scope.columnDimensionArray,  $scope.rowDimensionArray, $scope.filtersDimensionArray)
         var collectTilesMdxString = '';
         var collectFiltersMdxString = '';
         var collectRowMdxString = '';
         var collectColumnMdxString = '';
        for(var tthh = 0; tthh < $scope.tilesDimensionArray.length; tthh++){
           if(collectTilesMdxString === ''){
                collectTilesMdxString = "["+$scope.tilesDimensionArray[tthh]+"].&["+$rootScope.dimensionElementsArray[$scope.tilesDimensionArray[tthh]][$rootScope.selectedElementIndex[$scope.tilesDimensionArray[tthh]]-1].Name+"]"
           }else{
                collectTilesMdxString =  collectTilesMdxString + ", ["+$scope.tilesDimensionArray[tthh]+"].&["+$rootScope.dimensionElementsArray[$scope.tilesDimensionArray[tthh]][$rootScope.selectedElementIndex[$scope.tilesDimensionArray[tthh]]-1].Name+"]";
           }
             }
        for(var tth = 0; tth < $scope.columnDimensionArray.length; tth++){
            if($rootScope.dimensionSubsetsArray[$scope.columnDimensionArray[tth]]){
                var subsetToUse = '\"'+$rootScope.dimensionSubsetsArray[$scope.columnDimensionArray[tth]][$rootScope.selectedSubsetsIndex[$scope.columnDimensionArray[tth]]].Name+'\"'
                if(collectColumnMdxString === ''){
                    collectColumnMdxString = "TM1SubsetToSet(["+$scope.columnDimensionArray[tth]+"],"+subsetToUse+")"
               }else{
                collectColumnMdxString =  collectColumnMdxString + "* TM1SubsetToSet(["+$scope.columnDimensionArray[tth]+"], "+subsetToUse+")";
               }
               
            }
            
        }
        for(var thh = 0; thh < $scope.rowDimensionArray.length; thh++){
            
            if($rootScope.dimensionSubsetsArray[$scope.rowDimensionArray[thh]]){
          //console.log($scope.rowDimensionArray[thh], $rootScope.dimensionSubsetsArray,  "SUBSETNAME");
                var subsetToUse ='\"'+ $rootScope.dimensionSubsetsArray[$scope.rowDimensionArray[thh]][$rootScope.selectedSubsetsIndex[$scope.rowDimensionArray[thh]]].Name+'\"'
                if(collectRowMdxString === ''){

                        collectRowMdxString = "TM1SubsetToSet(["+$scope.rowDimensionArray[thh]+"],"+subsetToUse+")"
                }else{
                    collectRowMdxString =  collectRowMdxString + "* TM1SubsetToSet(["+$scope.rowDimensionArray[thh]+"],"+subsetToUse+")";
                }
            }
            
        }
        for(var th = 0; th < $scope.filtersDimensionArray.length; th++){
            if(collectFiltersMdxString === ''){
                collectFiltersMdxString = "["+$scope.filtersDimensionArray[th]+"].&["+$rootScope.dimensionElementsArray[$scope.filtersDimensionArray[th]][$rootScope.selectedElementIndex[$scope.filtersDimensionArray[th]]-1].Name+"]"
            }else{
                collectFiltersMdxString = collectFiltersMdxString+ ", ["+$scope.filtersDimensionArray[th]+"].&["+$rootScope.dimensionElementsArray[$scope.filtersDimensionArray[th]][$rootScope.selectedElementIndex[$scope.filtersDimensionArray[th]]-1].Name+"]"
            }
        }
        if(collectFiltersMdxString.length){
            $rootScope.mdxString =  "SELECT { "+collectColumnMdxString+" } ON COLUMNS, { "+collectRowMdxString+" } ON ROWS FROM ["+$scope.activeCubeName+"] WHERE ("+collectTilesMdxString+", "+collectFiltersMdxString+")";
        }else{
            $rootScope.mdxString =  "SELECT { "+collectColumnMdxString+" } ON COLUMNS, { "+collectRowMdxString+" } ON ROWS FROM ["+$scope.activeCubeName+"] WHERE ("+collectTilesMdxString+")";
        }
    }
    $scope.openSubsetModal = function(dimensionName){
        $rootScope.subsetModal = true;
        $rootScope.dimensionSelectedToEdit  = dimensionName;
        $rootScope.loading = true;
         $timeout(
             function(){
                $rootScope.editModalOpened = true;
                $rootScope.loading = false;
                $("#dimensionEditor").modal("show")
             },1000
         )
        
     }
    $scope.openElementModal = function(dimensionName){
        $rootScope.subsetModal = false;
       $rootScope.dimensionSelectedToEdit  = dimensionName;
       $rootScope.loading = true;
       $timeout(
        function(){
            $rootScope.editModalOpened = true;
            $rootScope.loading = false;
        $("#dimensionEditor").modal("show")
    },1000
    )
    }
    $scope.cubeDimensionalityArray = [];
    $rootScope.dimensionElementsArray = [];
    $scope.formatMdxStringCube = function(cube){ 
        if($scope.showCubeList){
            $scope.showCubeList = !$scope.showCubeList;
        }
        $rootScope.dimensionElementsArray = [];
        $rootScope.selectedElementIndex = [];
        $rootScope.dimensionSubsetsArray = [];
        $rootScope.selectedSubsetsIndex = [];

         $scope.mdxStringCube =  cube;
         $scope.activeCubeName = cube;
         $rootScope.cubeName = cube;

         $scope.openDimensionElements = [];
         $tm1Ui.cubeDimensions($scope.tm1Instance, cube).then(function(result){
            if(!result.failed){ 
                //console.log("cubeNameChanged Dimensions to load",  result);
                //$scope.cubeDimensionalityArray = result;
                $scope.rowDimensionArray = [];
                $scope.columnDimensionArray = [];
                 
                $scope.filtersDimensionArray = [];
                $scope.tilesDimensionArray = result;
                $rootScope.mdxString =  "SELECT { } ON COLUMNS, { } ON ROWS FROM ["+$scope.activeCubeName+"] WHERE ()";

                for(var kkd = 0; kkd < result.length; kkd++){
                    $tm1Ui.dimensionElements($scope.tm1Instance, result[kkd] ).then(function(resultEl){
                      if(resultEl){
                        if(resultEl[0] && resultEl.length){
                        var dim = (((resultEl[0]['UniqueName']).split('.')[0]).split('[').join('')).split(']').join('')
                        $rootScope.selectedElementIndex[dim] = resultEl[0]['Index']; 
                        $rootScope.dimensionElementsArray[dim] =  resultEl;
                         
                   //console.log("elements : ",   $rootScope.dimensionElementsArray ,"for dimension in cube" );
                        }
                      }
                    
                     
                    })
                    $tm1Ui.dimensionSubsets($scope.tm1Instance, result[kkd] ).then(function(resultSubset){
                        if(resultSubset){
                       //console.log("subsets : ",  resultSubset ,"for dimension in cube");
                             if(resultSubset[0] && resultSubset.length){
                                var dim = (((resultSubset[0]['UniqueName']).split('.')[0]).split('[').join('')).split(']').join('')
                                $rootScope.selectedSubsetsIndex[dim] = 0;
                                $rootScope.dimensionSubsetsArray[dim] =  resultSubset;
                             }
                              
                        }else{
                      //console.log("subsets : ",  resultSubset ,"for dimension in cube. Failed");
                        }
                    });
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