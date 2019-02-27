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
    $scope.offsetFromTop = 300;
    $scope.chartLoading = false;
    $rootScope.headerOutOffView = false;
    $rootScope.selections.account = "4";
    $scope.subsetSelected = false;	
    $scope.mainData = {
        "debug":false,
        "rowDimension":{"name":"Account", "subset":"dashboard","attributes":"Description"},
        "colDimension":{"name":"Period",  "subset":"All Months","attributes":"Short Description"},
        "instance":"dev",
        "cube":"General Ledger",
        "defaultCubeArray":['Actual',$rootScope.selections.year,'Year','Local',$rootScope.selections.region,$rootScope.selections.department,'1','Amount'],
        "chart":{
             "ledgend": {
                "0": {
                "color": "#4F81BD",
                "name": "Actual"
                },
                "1": {
                "color": "#7F7F7F",
                "name": "Budget"
                },
                "2": {
                "color": "darkred",
                "name": "Last Year"
                }
            }
        }

    };
    $rootScope.selections.subset = $scope.mainData['rowDimension']['subset'];
    $scope.getSubsetList  = function(){
        $tm1Ui.dimensionSubsets($scope.mainData['instance'],$scope.mainData['rowDimension']['name']).then(function(result){
             //console.log(result, "!!!!!!!!!!!!!");
            if(result){
               
                    
                    $scope.lists.subsetList = result;
                
            }
        });
    }
    
    $rootScope.chartValues = [];
    var stickyContainer = function(el) {
            $body = $(el);  
            $stickyHeader = $(el).find('#sticky-header');
            $fixedHeader = $(el).find('.fixed-container');
             $fixedFirstColHeader = $(el).find('.fixedFirstColHeader');
            
            return $($body).scroll(function() { 
                
                $scope.scrolling = true;
                    if($($body).scrollTop() > $scope.offsetFromTop){
                        $rootScope.headerOutOffView = true;
                        
                        $($stickyHeader).css('display','block'); 
                        $($stickyHeader).css('opacity','1'); 
                        $($stickyHeader).css('pointer-events','auto'); 
                        $($fixedHeader).css('pointer-events','auto'); 
                        $($fixedHeader).css('z-index','2');  
                        $($fixedFirstColHeader).css('display','block'); 
                    }else{
                        
                         
                        $rootScope.headerOutOffView = false;
                        $($stickyHeader).css('opacity','0'); 
                        $($stickyHeader).css('pointer-events','none'); 
                        $($fixedHeader).css('pointer-events','none'); 
                        $($fixedHeader).css('z-index','-1'); 
                        $($fixedFirstColHeader).css('display','none'); 
                    } 
                    $($fixedFirstColHeader).css('margin-left', -$($body).scrollLeft());
                    $($stickyHeader).css('margin-left', -$($body).scrollLeft());
                    //console.log("scroll inside the summary left , top : ",-$($body).scrollLeft(), -$($body).scrollTop()); 
            });
           
           
    };


    $scope.setUpStickyHeader = function(){
         $scope.stickyScrollTable = new stickyContainer($('.stickyContainer'));
    }


    $scope.getElementArray = function(rowDimName, rowDimElement, colDimName, colDimElement){
        var arrayConstracted = [];
        _.forEach($scope.mainData['DefaultCubeArray'], function(value) {
            //arrayConstracted.push(value);
            //console.log(value, "@@@@#######");
        });
        return ['Actual',$rootScope.selections.year,col.key,'Local',$rootScope.selections.region,$rootScope.selections.department,row.key,'Amount']
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
    $scope.loadChartValues = function(one,two,three){

      //console.log(one,two,three)
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
                   
                    $rootScope.valuesCapturedForChart.push((one) );
                        $rootScope.valuesCapturedForChart.push((two) );
                        $rootScope.valuesCapturedForChart.push((three) );
                        
                        $rootScope.valuesminCapturedForChart.push((one) );
                        $rootScope.valuesminCapturedForChart.push((two) );
                        $rootScope.valuesminCapturedForChart.push((three) );
                        
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
            console.log("INIT SELECTIONS ACCOUNT CHOSEN");
            var arrayToKeep = [];
            for(var ttr = 0; ttr < $scope.lists.account.length; ttr++){
                arrayToKeep.push($scope.lists.account[ttr]['key']);
            }
            if( (arrayToKeep).indexOf($rootScope.selections.account) === -1  ){
                console.log("NO SELECTED ACCOUNT IN SUBSET - INITIALISE FIRST IN THE LIST");
                $rootScope.selections.account = $scope.lists.account['0']['key'];
                
            }
                 },1000 )
        }
        $scope.$watch('$root.selections.subset', function (newValue, oldValue, scope) {
            $scope.initSelectionAccount();
            if(newValue != oldValue){
                
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
                $scope.chartLoading = true;
                 $scope.removeTooltips();
                $timeout(
                    function(){
                    $scope.chartLoading = false;
                        

                    } ,1000
                );
            }
            
            
           
        }); 
    $scope.refreshChart = function(){
         $scope.chartLoading = true;
                 $scope.removeTooltips();
                $timeout(
                    function(){
                    $scope.chartLoading = false;
                        

                    } ,1000
                );
    }
    //resize just for timeout the event so apply the changes in the html
    $(window).resize(function() {
         	 
            $timeout(
                function(){
                    //resize just timeout the event so applies the changes in the html
                }
            )
             

        });
}]);
