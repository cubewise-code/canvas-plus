app.controller('NamedMdxCtrl',  ['$scope',  '$rootScope', '$log', '$tm1Ui','$localStorage','$window', '$timeout',
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
    $rootScope.pageTitle = "Super Named MDX + Freezepane";
    $rootScope.cubeName = "General Ledger"
    $rootScope.mdxId = "Data Entry"
     
    $rootScope.showView = true; 
    //$rootScope.calendarShow = true ;
     
    $rootScope.attributeOptions = {"alias": {"Year":"Financial Year","Region":"Description" ,"Account": 'Description', "Period": 'Short Description', "Department": 'Description', "Version": 'Description'}}
    $scope.startAllFiltersAreHere = function(){
        $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

        console.log($rootScope.mdxParameters);
    }
    $scope.$watch(function () {
        return $rootScope.selections.year;
        
        }, function (newValue, oldValue) { 
            if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
             console.log(newValue, "mdx attributes changed inside directive");
              
             $rootScope.mdxParameters =  {parameters: {Year:newValue, Region:$rootScope.selections.region,Department:$rootScope.selections.department}}

            }
                    
        })
        $scope.$watch(function () {
            return $rootScope.selections.region;
            
            }, function (newValue, oldValue) { 
                if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                 console.log(newValue, "mdx attributes changed inside directive");
                  
                 $rootScope.mdxParameters =  {parameters: {Year:$rootScope.selections.year, Region:newValue, Department:$rootScope.selections.department}}
    
                }
                        
            })
            $scope.$watch(function () {
                return $rootScope.selections.department;
                
                }, function (newValue, oldValue) { 
                    if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                     console.log(newValue, "mdx attributes changed inside directive");
                      
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