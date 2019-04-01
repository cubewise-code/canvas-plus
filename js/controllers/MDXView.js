app.controller('MDXViewCtrl', ['$scope',  '$rootScope', '$log', '$tm1Ui','$localStorage','$window', '$timeout',
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
    $rootScope.pageTitle = "executeMDXCubeView";
    
     
    $rootScope.showView = true; 
    //$rootScope.calendarShow = true ;
   
    $scope.attributeOptions = {alias: {Account: 'Description', Period: 'Short Description', Department: 'Description', Version: 'Description'}}
    
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