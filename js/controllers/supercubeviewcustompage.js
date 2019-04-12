app.controller('supercubeviewcustompageCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$transitions','$location', '$timeout', 'globals','$window', 
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
    $scope.activeCubeName = $scope.cubeName;
    $scope.activeCubeViewName =  $scope.cubeView;
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
    $scope.getCubeViews = function(){
        $tm1Ui.cubeViews($scope.tm1Instance, $scope.activeCubeName).then( function(cubeviewdata){
            if(cubeviewdata){
                $tm1Ui.cubeDimensionsAndHierarchies($scope.tm1Instance, $scope.activeCubeName).then( function(cubedimesionalitydata){
                    if(cubedimesionalitydata){
                        $scope.dimensionalityArray = cubedimesionalitydata;
                        for(dim in $scope.dimensionalityArray['Dimensions']){
                            
                            var dimensionName = $scope.dimensionalityArray['Dimensions'][dim].Name;
                            
                            //console.log(dimensionName)
                                //  $tm1Ui.dimensionAttributes($scope.tm1Instance, dimensionName).then(function(dimAttributedata){
                                //      console.log(dimAttributedata);
                                //      $scope.currentDeminsionAttributes[dimAttributedata.Name] = dimAttributedata;
                                //  }) 
                             
                        }
                        //console.log($scope.dimensionalityArray, "DIMENSIONALITY")
                    }
                })
                $scope.cubesViewsAvailable = cubeviewdata;
                var cubeViewNamesArrayTemp = []
                for(view in $scope.cubesViewsAvailable){
                    cubeViewNamesArrayTemp.push($scope.cubesViewsAvailable[view].Name)
                }

                if((cubeViewNamesArrayTemp).indexOf($scope.activeCubeViewName) > -1){
                    
                }else{
                    $scope.activeCubeViewName = cubeViewNamesArrayTemp[0]
                   // console.log("CUSOM CUBEVIEW JS",$scope.cubesViewsAvailable);
                }
                $rootScope.cubeView = $scope.activeCubeViewName;
                $rootScope.cubeName = $scope.cubeName;
                $location.search('cubeName',  $rootScope.cubeName) 
                $location.search('cubeView', $rootScope.cubeView) 
                
               // console.log("CUSOM CUBEVIEW JS", $scope.tm1Instance, $scope.cubeName, $scope.cubeView, $rootScope.table['_data'][0][1]['dataset']['dimensions']);
            }
        });
    }

    $scope.getCubeViews();
    $scope.chooseCube = function(name){
        $timeout(
            function(){
                $scope.showCubeList = !$scope.showCubeList
                $scope.activeCubeName = name;
                $scope.cubeName = $scope.activeCubeName;
                 
                $scope.getCubeViews();
                 
            }
        )
         
    }
    $scope.getAttributesForDim = function(dimensionName, index){
        
        $timeout(
            function(){
                if(index === $scope.dimensionalityDimensionIndexClicked){
                    $scope.dimensionalityDimensionIndexClicked = '';
                    $scope.currentDimensionClicked = '';
                }else{
                    $scope.currentDimensionClicked = dimensionName;
                    $scope.dimensionalityDimensionIndexClicked = index;
                    $tm1Ui.dimensionAttributes($scope.tm1Instance, dimensionName).then(function(dimAttributedata){
                            console.log(dimAttributedata)
                            $scope.currentDeminsionAttributes = dimAttributedata;
                                        
                        
                        
                    }) 
                }
                        
            }
        )
         
    }
    $scope.selectAliasToUse = function(dimensionName, aliasName ){
        console.log(dimensionName, aliasName, $rootScope.attributeOptions['alias'][dimensionName]);
        $rootScope.attributeOptions['alias'][dimensionName] = aliasName;
        
    }
    $scope.chooseCubeView = function(name){
        $timeout(
            function(){
                $scope.showViewCubeList = !$scope.showViewCubeList
                $scope.activeCubeViewName = name;
                $rootScope.cubeView = $scope.activeCubeViewName;
               // console.log('new cubeview to load', $scope.cubeView)
               $location.search('cubeView', name) 
                 
            }
        )
         
    }

}]);