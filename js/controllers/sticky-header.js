app.controller('stickyheaderCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui','$timeout', 
function($scope, $rootScope, $log, $tm1Ui,$timeout) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {};
    $scope.lists = {};
    $scope.values = {};
    $rootScope.pageTitle = "Sticky Headers";
     
    $scope.chartLoading = false;
    $rootScope.headerOutOffView = false;
    $rootScope.selections.account = "4";
    $scope.loggedOut = false;
    $scope.subsetSelected = false;	
    $scope.chartselections = [true,true,true];
     
    $scope.refreshMainData = function(){
         $scope.mainData = {
        "timeoutBlockout":true,
        "visualiseChartValues":true,
        "debugJson":false,
        "rowDimension":{"name":"Account", "mdx":"{TM1DRILLDOWNMEMBER( {[Account].[4]}, ALL, RECURSIVE )}","attributes":"Description"},
        "colDimension":{"name":"Period",  "subset":"All Months","attributes":"Short Description"},
        "instance":$rootScope.defaults.settingsInstance,
        "cube":"General Ledger",
        "defaultCubeArray":['Actual',$rootScope.selections.year,'Year','Local',$rootScope.selections.region,$rootScope.selections.department,'1','Amount'],
        "dbrPercentageFormat":false,
        "dbrDataDecimal":0,
        "chart":{
            "show":true,
             "dimensionComparison":"Version",
             "size":3,
             "ledgend": {
                 
                "0": {
                "color": $rootScope.applicationHeaderColorSelect,
                "name": "Actual"
                },
                "1": {
                "color": $rootScope.applicationHeaderColorBudget,
                "name": "Budget"
                },
                "2": {
                "color":  $rootScope.applicationHeaderColorLastYear,
                "name": "Last Year"
                }
            }
        }
          

    };
    
    }
    $scope.refreshMainData();
    $rootScope.selections.subset = $scope.mainData['rowDimension']['subset'];
    $rootScope.selections.version = $scope.mainData['chart']['ledgend'][0]['name'];
 
    $scope.getSubsetList  = function(){
        $tm1Ui.dimensionSubsets($scope.mainData['instance'],$scope.mainData['rowDimension']['name']).then(function(result){
             //console.log(result, "!!!!!!!!!!!!!");
            if(result){ 
                    $scope.lists.subsetList = result; 
            }
        });
    }
     $tm1Ui.cubeDimensions($scope.mainData['instance'], $scope.mainData['cube']).then(function(result){
         if(result){
              $scope.cubeDimensionalityArray = result;
         }
         
     });
    $scope.getElementArray = function(rowDimName,rowVal,colDimName,colVal, driverDimName, driverValue){
       

          
                var elementArrayToPassBack = $scope.mainData['defaultCubeArray'];
                for(var ggd = 0 ; ggd < $scope.cubeDimensionalityArray.length; ggd++){
                    var dimName = $scope.cubeDimensionalityArray[ggd];
                    if(rowDimName && dimName === rowDimName){
                        //console.log( rowDimName);
                        elementArrayToPassBack[ggd] = rowVal+'';
                    } 
                      if(colDimName && dimName === colDimName){
                        //console.log($scope.cubeDimensionalityArray[ggd], colDimName);
                        elementArrayToPassBack[ggd] = colVal+'';
                        }
                          if(driverValue && dimName === driverDimName){
                        //console.log($scope.cubeDimensionalityArray[ggd], colDimName);
                        elementArrayToPassBack[ggd] = driverValue+'';
                        }
                     
                     
                }
                //console.log(elementArrayToPassBack.toString())
                return elementArrayToPassBack.toString();
 
        
    }

     
    $rootScope.chartValues = [];
    var stickyContainer = function(el) {
            $body = $(el);  
            $stickyHeader = $(el).find('#sticky-header');
            $fixedHeader = $(el).find('.fixed-container');
            $fixedFirstColHeader = $(el).find('.fixedFirstColHeader');
            $headerContent = $(el).find('#headerContent');
            $sideContent = $(el).find('#sideContent');
            $subsetDropdown = $(el).find('#subsetDropDown');
            $sideChartContent = $(el).find('#sideChartContent');
            $sideDebugContent = $(el).find('#sideDebugContent');

            return $($body).scroll(function() { 
                if($scope.mainData['visualiseChartValues']){
                    if(document.getElementById('visualiseChartValues')){
                        $scope.offsetTop = document.getElementById('visualiseChartValues').getBoundingClientRect().height;
                    }
                    
                }else{
                    $scope.offsetTop = 0;
                }
                $scope.scrolling = true;
                if( $scope.mainData['chart']['show']){
                    if(document.getElementById('chartRow')){
                        $scope.offsetFromTop = document.getElementById('chartRow').getBoundingClientRect().height;
                         var valuetoEval = (document.getElementById('chartRow').getBoundingClientRect().height)+$scope.offsetTop;
                    }else{
                         var valuetoEval = $scope.offsetTop;
                    }
                    
                }else{
                     var valuetoEval = $scope.offsetTop;
                }
                
                    if($($body).scrollTop() > (valuetoEval)){

                        $rootScope.headerOutOffView = true;
                        
                        $($stickyHeader).css('display','block'); 
                        $($stickyHeader).css('opacity','1'); 
                        $($stickyHeader).css('pointer-events','auto'); 
                        $($fixedHeader).css('pointer-events','auto'); 
                        
                        if($($body).scrollLeft() != 0){ 
                            $($fixedFirstColHeader).css('display','block');
                             $($fixedFirstColHeader).css('margin-top','-'+((valuetoEval))+'px');
                        }else{
                            $($fixedFirstColHeader).css('display','none');
                        }
                        
                       // $($fixedFirstColHeader).css('display','block'); 
                    }else{
                        if($($body).scrollLeft() != 0){
                             $($fixedFirstColHeader).css('display','block');
                            $($fixedFirstColHeader).css('margin-top', -$($body).scrollTop());
                        }else{
                             $($fixedFirstColHeader).css('display','none');
                        }
                         
                        $rootScope.headerOutOffView = false;
                        $($stickyHeader).css('opacity','0'); 
                        $($stickyHeader).css('pointer-events','none'); 
                        $($fixedHeader).css('pointer-events','none'); 
                         
                       // $($fixedFirstColHeader).css('display','none'); 
                    } 
                    if($($body).scrollLeft() != 0){
                         $(sideChartContent).css('display', 'block');
                           $($sideChartContent).css('margin-top', -$($body).scrollTop());
                           $(sideDebugContent).css('display', 'block');
                           $($sideDebugContent).css('margin-top', -$($body).scrollTop());

                           
                          $($sideContent).css('display', 'block');
                        $($sideContent).css('margin-top', -$($body).scrollTop());
                    }else{
                        $($sideContent).css('display', 'none');
                        $(sideChartContent).css('display', 'none');
                        $(sideDebugContent).css('display', 'none');
                    }
                     
                    $($subsetDropdown).css('margin-top', -$($body).scrollTop());
                    $($stickyHeader).css('margin-left', -$($body).scrollLeft());
                    //console.log("scroll inside the summary left , top : ",-$($body).scrollLeft(), -$($body).scrollTop()); 
            });
           
           
    };


    $scope.setUpStickyHeader = function(){
         $scope.stickyScrollTable = new stickyContainer($('.stickyContainer'));
    }


     
    $scope.getContainerWidth = function(idName){
        if(document.getElementById(idName)){
            var tempObj = document.getElementById(idName);
            if(tempObj != null || tempObj != undefined ){
                return tempObj.getBoundingClientRect().width;
            }
        }
        

    }

    $scope.getContainerHeight = function(idName){
        if(document.getElementById(idName)){
            var tempObjTwo = document.getElementById(idName);
            if(tempObjTwo != null || tempObj != undefined ){
                return tempObjTwo.getBoundingClientRect().height;
            }
        }
    }
    $scope.getContainerTop = function(id){
        if(document.getElementById(id)){
            var tempObjTop = document.getElementById(id);
            if(tempObjTop != null || tempObjTop != undefined ){
                return tempObjTop.getBoundingClientRect().top;
            }
        }
    }
     
    $scope.setTableHeight = function(id){
        if(document.getElementById(id)){
            var tempObjToTrack = document.getElementById(id);
            if(tempObjToTrack != null || tempObjToTrack != undefined ){
                return ((window.innerHeight - tempObjToTrack.getBoundingClientRect().top));
            }
        }
    }
    $scope.scrolling = false;
    $rootScope.valuesCapturedForChart = [];
    $rootScope.chartsDataLoaded = false;
    $rootScope.valuesminCapturedForChart = [];

    $scope.doClickLedgend = function(num){
        $scope.chartselections[num] = !$scope.chartselections[num]; 
        $scope.refreshChart();
    }
    $scope.loadChartValues = function(one,two,three){

      ////console.log(one,two,three)
                    var numone = one;
                      var numtwo = two;
                        var numthree = three;
                   if(isNaN(numone)){
                       one = 0;
                   }  
                   if(isNaN(numtwo)) {
                        two = 0;
                   } 
                   if(isNaN(numthree) ){
                        three = 0;
                   } 
                   
                   if($scope.chartselections[0]){
                        $rootScope.valuesCapturedForChart.push((one) );
                         $rootScope.valuesminCapturedForChart.push((one) );
                   }
                    if($scope.chartselections[1]){
                        $rootScope.valuesCapturedForChart.push((two) );
                        $rootScope.valuesminCapturedForChart.push((two) );
                   }

                        if($scope.chartselections[2]){
                                $rootScope.valuesCapturedForChart.push((three) ); 
                                $rootScope.valuesminCapturedForChart.push((three) );
                       } 
                         
                     
                        
                        $rootScope.maxValToUse = Math.max.apply(null, $rootScope.valuesCapturedForChart);
                         $rootScope.minValToUse = Math.min.apply(null, $rootScope.valuesminCapturedForChart);
                           //console.log('max to use', $rootScope.minValToUse, $rootScope.maxValToUse, $rootScope.valuesCapturedForChart, "############")
                        if($rootScope.valuesCapturedForChart.length === 12*3){
                            if($rootScope.maxValToUse === 0){
                                $rootScope.maxValToUse = 1;
                            }else{

                            }
                              
                            $rootScope.chartsDataLoaded = true;
                             
                        }
                   
                     
                    
                     
                   // //console.log($rootScope.valuesCapturedForChart, $rootScope.valuesCapturedForChart.length);
        }

        $scope.removeTooltips = function(){
            $rootScope.valuesCapturedForChart = [];
            $rootScope.valuesminCapturedForChart = [];
            $rootScope.maxValToUse = 1;
            $rootScope.minValToUse = 0;
            for( var e = document.getElementsByClassName('ttip').length ; e > 0; e--){
                //console.log(document.getElementsByClassName('ttip')[e])
                    var elem = document.getElementsByClassName('ttip')[e]
                    if(elem){
                        elem.parentNode.removeChild(elem);

                    }    
            }
                        
                    
                    
        }

        $scope.$watch('$root.selections.year', function (newValue, oldValue, scope) {
        
            if(newValue != oldValue){
                $scope.refreshMainData();
                $scope.chartLoading = true;
                $scope.removeTooltips();
                $timeout(
                    function(){
                    $scope.chartLoading = false;
                        

                    } ,1000
                );
            }
            
            
           
        }); 
        $scope.initSelectionAccount = function(){
               
                $timeout(
                function(){
            //console.log("INIT SELECTIONS ACCOUNT CHOSEN");
            var arrayToKeep = [];
            for(var ttr = 0; ttr < $scope.lists.account.length; ttr++){
                arrayToKeep.push($scope.lists.account[ttr]['key']);
            }
            if( (arrayToKeep).indexOf($rootScope.selections.account) === -1  ){
             //   console.log("NO SELECTED ACCOUNT IN SUBSET - INITIALISE FIRST IN THE LIST");
                if($scope.lists.account.length){
                           $rootScope.selections.account = $scope.lists.account['0']['key'];
                }
          
                
            }
                 },1000 )
        }
        $scope.$watch('$root.selections.subset', function (newValue, oldValue, scope) {
            $scope.initSelectionAccount();
            if(newValue != oldValue){
                  $scope.refreshMainData();
                $scope.chartLoading = true;
                $scope.removeTooltips();
                $timeout(
                    function(){
                    $scope.chartLoading = false;
                    

                    } ,1000
                );
            }
            
            
           
        }); 
         $scope.$watch('$root.selections.department', function (newValue, oldValue, scope) {
        
            if(newValue != oldValue){
                  $scope.refreshMainData();
                 $scope.chartLoading = true;
                  $scope.removeTooltips();
                $timeout(
                    function(){
                    $scope.chartLoading = false;
                    

                    } ,1000
                );
            }
            
            
           
    }); 

    $scope.$watch('$root.selections.region', function (newValue, oldValue, scope) {
    
        if(newValue != oldValue){
              $scope.refreshMainData();
            $scope.chartLoading = true;
                $scope.removeTooltips();
            $timeout(
                function(){
                $scope.chartLoading = false;
                

                } ,1000
            );
        }
        
        
        
    }); 
    $scope.chartLoadingNow = false; 
    $scope.refreshChart = function(){
                $scope.removeTooltips();
                $scope.chartLoading = true;
                 
                $timeout(
                    function(){
                    $scope.chartLoading = false; 
                    },1000 
                );
    }
    //resize just for timeout the event so apply the changes in the html
    $scope.countIdel = 0;
    $scope.mouseMovedSetXY = function($event){
       // console.log(event.x, event.y);
        $scope.mouseMovedXY = event.x+' '+event.y;
        if($scope.idelTimePassed){
            if(!$scope.loggedOut){
                $tm1Ui.applicationUser($scope.mainData['instance']).then(function(result){
                if(result){
                    if(result['IsActive']){
                   // console.log(result, "LOGIN INFO");
                        $scope.alpha = 0; 
                        $scope.loggedOut = false;
                        $scope.idelTimePassed =false;
                        $scope.runTimeout(); 
                    }else{
                        
                         
                            $scope.loggedOut = true;
                             
                    }
                }else{
                       
                            $scope.loggedOut = true;
                            
                }
                 
                
            });
            }
            
        }
         

        
      
        
       
    }
     $scope.idelTimePassed =false;
     $scope.alpha = 0;
    $scope.runTimeout = function(){
        
        $timeout(
            function(){
 
                if($scope.countIdel > 250){
                      
                    if($scope.mouseMovedXY === $scope.lastMovedXY){
                        //console.log("running timeout",$scope.alpha, $scope.countIdel,  $scope.lastMovedXY, $scope.mouseMovedXY);
                        if($scope.alpha >= 0.9){
                            $scope.idelTimePassed = true;
                            $scope.countIdel = 251;
                            $scope.alpha  = 0.9;
                        }else{
                              $scope.idelTimePassed = true;
                              $scope.countIdel = 0;
                              $scope.runTimeout();
                        }
                        
                        
                          
                    }else{
                        //console.log($scope.countIdel, $scope.mouseMovedXY,  $scope.lastMovedXY,  "mouse moved");
                        $scope.loggedOut = false;
                         
                        $scope.idelTimePassed = false;
                        $scope.countIdel = 0;
                        
                        $scope.runTimeout();
                    }
                    $scope.lastMovedXY = $scope.mouseMovedXY;

                }else{
                    if($scope.countIdel === 0){
                        $scope.lastMovedXY = $scope.mouseMovedXY;
                    }
                   
                    if( $scope.idelTimePassed  ){ 
                           
                           // console.log("STARTED PAUSE HIDING INFO");
                           if($scope.mouseMovedXY === $scope.lastMovedXY){
                                $scope.alpha = 0.9; 
                                $rootScope.closeApplication(false);
                           //$rootScope.activeTab = -2;
                           }
                        
                    } 
                   // console.log("count", $scope.countIdel);
                     
                    $scope.countIdel++; 
                    $scope.runTimeout();
                }
                
            },3000
        )
    }
    $scope.runTimeout();
    $(window).resize(function() {
         	 
            $timeout(
                function(){
                    //resize just timeout the event so applies the changes in the html
                }
            )
             

        });
}]);
