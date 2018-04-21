app.controller('headerCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$transitions','$location', '$timeout', function($scope, $rootScope, $log, $tm1Ui, $transitions,$location, $timeout) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    // console.log("HEADER");
    $rootScope.activeSubTab = 0;
    $scope.clickedSubNav = function(num){
         
        $rootScope.activeSubTab = num;
        console.log("sub nav clicked", $rootScope.activeSubTab);
    }
     $transitions.onStart({}, function ($transitions) {
           $timeout( function(){ 
                $rootScope.pathToUse = $transitions._targetState._identifier.name;
                    $rootScope.pathArray = $transitions._targetState._identifier.navigable.path;
              
                    if($rootScope.menuData){
                         for(var item in  $rootScope.menuData[0].children){
                            
                        if( $rootScope.pathToUse === 'base'){
                            $rootScope.activeTab = 0;
                            $rootScope.activeSubTab = 0;
                        } else if( $rootScope.menuData[0].children[item].data.page === $rootScope.pathToUse){
                               console.log("%%%%%%% R" ,  $rootScope.menuData[0].children[item].data.page);
                           // $rootScope.activeTab = parseInt(item)-1;
                            //$rootScope.activeSubTab = 0;
                           
                        } 
                        
                    }
                    }
                    
                    
            } );
          

          
     });
    
}]);


 