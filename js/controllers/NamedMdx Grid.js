app.controller('NamedMdxGridCtrl',  ['$scope',  '$rootScope', '$log', '$tm1Ui','$localStorage','$window', '$timeout',
function($scope,  $rootScope, $log, $tm1Ui, $localStorage, $window, $timeout) {
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
    $rootScope.cubeView = '';
    $rootScope.pageTitle = "Super Named MDX + Grid";
    $rootScope.cubeName = "Employee"
    $rootScope.interactiveLayer = true;
    $rootScope.mdxId = "Employee Forecast"
    $rootScope.mdxIdOne = "Region By Departments"
    $rootScope.mdxIdTwo = "Department By Regions"
    $rootScope.mdxString = "SELECT {[Period].[Year], [Period].[Jan], [Period].[Feb], [Period].[Mar], [Period].[Apr], [Period].[May], [Period].[Jun], [Period].[Jul], [Period].[Aug], [Period].[Sep], [Period].[Oct], [Period].[Nov], [Period].[Dec]} ON COLUMNS, {TM1DRILLDOWNMEMBER( {[Account].[Net Income]}, ALL, RECURSIVE )} ON ROWS FROM ["+$rootScope.cubeName+"] WHERE ([Year].&[2018], [Region].&[England], [General Ledger Measure].&[Amount], [Currency].&[Local], [Version].&[Budget], [Department].&[Corporate])" 
    $rootScope.useMdx = false;
    $rootScope.useDbr = false;
    $rootScope.useMdxNow = false; 
    $rootScope.showView = true; 
    $rootScope.useGrid = true;
    $rootScope.showSectionFullScreen = {
        'one':false,
        'two':false,
        'three':false

    };
    $rootScope.defaultstableTop = {
        'one':139,
        'two':139,
        'three':530
    } 
    $rootScope.tableTop={
        'one':139,
        'two':139,
        'three':530
    }
    $rootScope.tableHeight = {
        "one": 330,
        "two": 330,
        "three": 0,

    }
    $rootScope.defaultstableHeight = {
        "one": 330,
        "two": 330,
        "three": 0,

    }
    $rootScope.tableWidth = {
        "one": '50%',
        "two": '50%',
        "three": '100%',

    }
    $rootScope.defaultstableWidth = {
        "one": '50%',
        "two": '50%',
        "three": '100%',

    }
    $rootScope.tableLeft = {
        "one": '0%',
        "two": '50%',
        "three": '0%',

    }
    $rootScope.defaultstableLeft = {
        "one": '0%',
        "two": '50%',
        "three": '0%',

    }
    
   

   
    //$rootScope.calendarShow = true ;
     
    $rootScope.attributeOptions = {"alias": {"Year":"Financial Year","Region":"Description" ,"Account": 'Description', "Period": 'Short Description', "Department": 'Product Category', "Version": 'Description', "Employee": 'Full Name'} }
    $scope.startAllFiltersAreHere = function(){
        $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

        //console.log($rootScope.mdxParameters);
    }
    $scope.$watch(function () {
        return $rootScope.selections.year;
        
        }, function (newValue, oldValue) { 
            if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
             //console.log(newValue, "mdx attributes changed inside directive");
              
             $rootScope.mdxParameters =  {parameters: {Year:newValue, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

            }
                    
        })
        $scope.$watch(function () {
            return $rootScope.selections.region;
            
            }, function (newValue, oldValue) { 
                if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
               //  console.log(newValue, "mdx attributes changed inside directive");
                  
                 $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:newValue, Department:$rootScope.selections.department}}
    
                }
                        
            })
            $scope.$watch(function () {
                return $rootScope.selections.department;
                
                }, function (newValue, oldValue) { 
                    if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                 //    console.log(newValue, "mdx attributes changed inside directive");
                      
                     $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region, Department:newValue}}
        
                    }
                            
                })
               
                $rootScope.hideCharts = false;
                $rootScope.showSectionFullScreenActive = false;
                $rootScope.toggleFullScreenComponent = function(tableId, decider){
                    
                   if( decider === true ){
                        $rootScope.showSectionFullScreen[tableId] = true;
                        
                        _.forEach($rootScope.tableTop, function(value, key) {
                            
                            $rootScope.showSectionFullScreenActive = true;
                            if(key === tableId){
                                $rootScope.tableTop[key] = 139;
                                $rootScope.tableHeight[key] = null;
                                $rootScope.tableWidth[key] = '100%';
                                $rootScope.tableLeft[key] = '0%';
                            }else{
                                $rootScope.tableHeight[key] = 0;
                                $rootScope.tableTop[key] = 0;
                                $rootScope.tableWidth[key] = 0;
                                $rootScope.tableLeft[key] = 0;
                            }
                            
                        });
                     
                   }else{
                        $rootScope.showSectionFullScreenActive = false;
                        _.forEach($rootScope.tableTop, function(value, key) {
                            $rootScope.showSectionFullScreen[key] = false;
                            $rootScope.tableLeft[key] = $rootScope.defaultstableLeft[key];
                            $rootScope.tableWidth[key] = $rootScope.defaultstableWidth[key];
                            $rootScope.tableHeight[key] = $rootScope.defaultstableHeight[key];
                            $rootScope.tableTop[key] = $rootScope.defaultstableTop[key];
                            
                        });
                    
                   }
                  
                    //  if($rootScope.chartsHeight === $rootScope.topSection){
                    //     $rootScope.chartsHeight[tableId] =  $scope.chartsDefaultHeight;
                    //     $rootScope.chartsTableHeight = $scope.chartsDefaultTableHeight;
                    //     $rootScope.hideCharts = false;
                    //  }else{
                    //     $rootScope.hideCharts = true;
                    //     $rootScope.chartsHeight =  $rootScope.topSection;
                    //     $rootScope.chartsTableHeight =0;

                    //  }
                     

                    //$rootScope.chartsTableHeight[tableId] = true;
                     if(document.getElementsByClassName('nvtooltip xy-tooltip')){
                        for(hss = 0; hss < document.getElementsByClassName('nvtooltip xy-tooltip').length; hss++){
                           var obbbj =  document.getElementsByClassName('nvtooltip xy-tooltip')[hss];
                           console.log("tracing the tootltips");
                           obbbj.style.opacity = 0;
                        }
                     }
                    $timeout(
                        function(){
                            $('#stickyContainer'+tableId).animate({
                                scrollTop: 1
                             });
                        },1000
                    )
                      
                    
                      
                   //$scope.dragStart = true;
                     
                }

}]);
app.directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
}]);
