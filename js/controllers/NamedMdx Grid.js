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
    $rootScope.chartsHeight = 490;
    $rootScope.chartsTableHeight = 324;
    $scope.chartsDefaultHeight = 490;
    $scope.chartsDefaultTableHeight = 324;
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
                $scope.stopDrag = function(){
                    console.log()
                    //$scope.dragStart = false;
                }

                $scope.moveDrag = function(e){
                    // if($scope.dragStart && $scope.dragStart === true){
                    //     if($rootScope.chartsTableHeight  >= 30 && e.screenY < $scope.startY){
                    //         $rootScope.chartsHeight =  $rootScope.chartsHeight - 10;
                    //         $rootScope.chartsTableHeight =  $rootScope.chartsTableHeight - 10;
                    //     }else{
                    //         $rootScope.chartsHeight =  $rootScope.chartsHeight + 10;
                    //         $rootScope.chartsTableHeight =  $rootScope.chartsTableHeight + 10;
                    //     }

                         
                    //     console.log("move capture")
                    // }else{

                    // }
                    
                }
                $rootScope.hideCharts = false;
                $rootScope.toggleCharts = function(){
                     if($rootScope.chartsHeight === 180){
                        $rootScope.chartsHeight =  $scope.chartsDefaultHeight;
                        $rootScope.chartsTableHeight = $scope.chartsDefaultTableHeight;
                        $rootScope.hideCharts = false;
                     }else{
                        $rootScope.hideCharts = true;
                        $rootScope.chartsHeight =  180;
                        $rootScope.chartsTableHeight =0;

                     }
                    
                     if(document.getElementsByClassName('nvtooltip xy-tooltip')){
                        for(hss = 0; hss < document.getElementsByClassName('nvtooltip xy-tooltip').length; hss++){
                           var obbbj =  document.getElementsByClassName('nvtooltip xy-tooltip')[hss];
                           console.log("tracing the tootltips");
                           obbbj.style.opacity = 0;
                        }
                     }
                    
                     window.dispatchEvent(new Event('resize'));
                      
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
