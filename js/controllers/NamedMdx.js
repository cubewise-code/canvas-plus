app.controller('NamedMdxCtrl',  ['$scope',  '$rootScope', '$log', '$tm1Ui','$localStorage','$window', '$timeout', '$location',
function($scope,  $rootScope, $log, $tm1Ui, $localStorage, $window, $timeout, $location) {
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
    $rootScope.pageTitle = "Super Named MDX ";
    $scope.cubeNUrlValue = decodeURI($location.search()['cubeName']); 
    $scope.mdxIdUrlValue = decodeURI($location.search()['mdxId']); 
    if($scope.mdxIdUrlValue != null && $scope.mdxIdUrlValue != 'undefined'     ){
  //console.log($scope.cubeNameUrlValue, "URL VALUES TRACKED" )
        $rootScope.mdxId  = $scope.mdxIdUrlValue; 
        
    }else{
        $rootScope.mdxId = "Data Entry"
    }
    if($scope.cubeNUrlValue  != null && $scope.cubeNUrlValue != 'undefined'){
         
        $rootScope.cubeName = decodeURI($location.search()['cubeName']);
    }else{
        $rootScope.cubeName = "General Ledger" 
    }

    

     
    $rootScope.mdxString = "SELECT {[Period].[Year], [Period].[Jan], [Period].[Feb], [Period].[Mar], [Period].[Apr], [Period].[May], [Period].[Jun], [Period].[Jul], [Period].[Aug], [Period].[Sep], [Period].[Oct], [Period].[Nov], [Period].[Dec]} ON COLUMNS, {TM1DRILLDOWNMEMBER( {[Account].[Net Income]}, ALL, RECURSIVE )} ON ROWS FROM ["+$rootScope.cubeName+"] WHERE ([Year].&[2018], [Region].&[England], [General Ledger Measure].&[Amount], [Currency].&[Local], [Version].&[Budget], [Department].&[Corporate])" 
    $rootScope.useMdx = false;
    $rootScope.useDbr = false;
    $rootScope.useMdxNow = false; 
    $rootScope.showView = true; 
    $rootScope.dimName = [];
    //$rootScope.calendarShow = true ;
     
    $rootScope.attributeOptions = {"alias": {"Year":"Financial Year","Region":"Description" ,"Account": 'Description', "Period": 'Short Description', "Department": 'Description', "Product":"Code&Description", "Version": 'Caption_Default', "Employee": 'Full Name'} }
    $scope.startAllFiltersAreHere = function(){
        $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

        //console.log($rootScope.mdxParameters);
    }
    $scope.read = function(workbook){
  //console.log('do read', workbook);

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

 