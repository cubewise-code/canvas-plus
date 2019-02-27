app.controller('headerCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$transitions','$location', '$timeout', 'globals','$window', 
function($scope, $rootScope, $log, $tm1Ui, $transitions,$location, $timeout, globals, $window) {
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
    $rootScope.subPathBoolean = false;
    $rootScope.innerHeight = window.innerHeight/2;
    $rootScope.innerWidth = window.innerWidth ;
    $rootScope.defaultOffSet = 70;
    $rootScope.topOffSet = $rootScope.defaultOffSet ;
    $rootScope.selectedsubParentPage = '';
    $rootScope.topOffSetPageView = $rootScope.topOffSet+60;
      
    $scope.print={};
    $scope.print.pageOrientation = "Landscape";
    $scope.print.pageSize = "A3";

    $rootScope.pageUrlEncoded = function() {
		return encodeURIComponent($location.absUrl());
	};
	
	$rootScope.pageUrl = function() {
		return $location.absUrl();
	};
	
    $scope.clickedSubNav = function(num){
         
        $rootScope.activeSubTab = num;
        console.log("sub nav clicked", $rootScope.activeSubTab, $rootScope.session.active);
    }
    $rootScope.values={
        year:''
    }; 
    $rootScope.defaults={
            year:"",
            region:"",
            department:"",
            settingsInstance: 'dev',
            settingsCube: 'System User Settings',
            settingsMeasure: 'String'
    };
    $rootScope.selections={
        year:'',
        region:'',
        Department:''
    };
    
    $rootScope.logout = function(sessionname){
        console.log(sessionname);

    }
    $rootScope.date = new Date() ;
    $rootScope.date  = ((($rootScope.date+"").split(":")[0]).split(',').join('')).split(' ').join('')
    console.log($rootScope.date, "date");
    //Initialize all variables
    /// REFRESH ALL COMPONENTS ON THE PAGE FUNCTION FIRED EVERY TIME THE 3 KPI OR THE MAIN CHART NEEDS TO SHOW NEW VALUES
    $scope.initializeVariables = function(){
                $tm1Ui.applicationUser("dev").then(function(data){
                    $rootScope.values.user = data;
                   //console.log($scope.defaults.year, $scope.defaults.version, $scope.defaults.region, $scope.defaults.department);
                    globals.updateSettings($rootScope.values, $rootScope.defaults, $rootScope.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default"});
                    globals.updateSettings($rootScope.values, $rootScope.defaults, $rootScope.selections, "region", {"tm1Dimension":"Region", "tm1Alias":"Description"});
                    globals.updateSettings($rootScope.values, $rootScope.defaults, $rootScope.selections, "department", {"tm1Dimension":"Department", "tm1Alias":"Description"});
                   
                   console.log($scope.defaults.year);
                });   
            }

            //Initialize all variables
        $scope.updateSettings = function (values, defaults, selections, parameter, options){
            console.log($scope.defaults.year, $scope.defaults.version, $scope.defaults.region, $scope.defaults.department, $scope.defaults.homeSubset, $scope.defaults.homeAccount);
          globals.updateSettings(values, defaults, selections, parameter, options); 
        }

             

            //Run Initialization
          
        
  $scope.getLeftMargin = function(idname){
    if(document.getElementById(idname) ){
        console.log(document.getElementById(idname).getBoundingClientRect().left  );
        if(document.getElementById("pop-over-body")){
            document.getElementById("pop-over-body").style.left = document.getElementById(idname).getBoundingClientRect().left +"px";
        }
        
    }
  }
  
   $window.onscroll = function(){

            $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
             
              if( document.getElementById('dropdownbtns')){
                  
                document.getElementById('dropdownbtns').style.top=  ((document.getElementById('dropdownbtns').style.top) -$scope.scrollPos) +"px"
                   console.log(document.getElementById('dropdownbtns').style.top);
              }
               
            $scope.$digest();
        };

  
  $rootScope.onChartElementClick = function(element){
      console.log("element:", element);
  }
  $transitions.onSuccess({}, function ($transitions) {
       $scope.initializeVariables();
    $rootScope.pathToUse = $transitions._targetState._identifier.name;
      //$rootScope.pathArray = $transitions._targetState._identifier.navigable.path;
      if($transitions._targetState._identifier.navigable){
        $rootScope.pathArray = $transitions._targetState._identifier.navigable.path;
      }
       
                      
    $timeout( function(){ 
        console.log($rootScope.pathArray, "path array");
         
        if(($rootScope.pathArray[1].name).split("/").length > 1  ){
            $rootScope.subPathBoolean = true; 
            
            console.log(($rootScope.pathArray[1].name).split("/").length, "sub path true");
        }else{
            if(($rootScope.pathArray[1].name) === 'base'){
                 console.log($rootScope.pathArray[1].name, "No Sub Path");
                 $rootScope.subPathBoolean = false;
            }else{
                 console.log($rootScope.pathArray[1].name, "No Sub Path");
                $rootScope.subPathBoolean = false;
            }
            
        }
        if(!$rootScope.activeTab && $rootScope.pathToUse === 'base'){
            $rootScope.activeTab = -1;
             $rootScope.subPathBoolean = false;
        }else{
             
             for(var i = 0; i < $rootScope.menuData[0]['children'].length; i++){
                    if($rootScope.menuData[0]['children'][i]['data'].page === ($rootScope.pathArray[1].name).split("/")[0]){
                        $rootScope.activeTab = parseInt(i); 
                         $rootScope.selectedsubParentPage = (($rootScope.pathArray[1].name).split("/")[0]).split("-").join(" ")+" / ";
                        if(document.getElementById('level-two-'+($rootScope.pathArray[1].name).split("/")[0])){
                                // document.getElementById('level-two-'+($rootScope.pathArray[1].name).split("/")[0]).setAttribute("class", "active"); 
                        }
                            
                    }else{
                        if(document.getElementById('level-two-'+($rootScope.pathArray[0].name).split("/")[0])){
                            //document.getElementById('level-two-'+($rootScope.pathArray[0].name).split("/")[0]).setAttribute("class", "active"); 
                        }
                    
                   
                    }
               }
             }
        
    }, 100);
  })
  $scope.animateSideBar = function(a, b, open){
       if(open){
           document.getElementById("righthandsidebar").style.marginLeft= (-260)+"px";
       }else{
           document.getElementById("righthandsidebar").style.marginLeft= (0)+"px";
       }
             
       
     
  }
  $scope.animatePaddingTopSideBar= function(number){
      document.getElementById("righthandsidebar").style.marginTop = (number+46)+"px";
  }
  $scope.animatePadding = function(number){
      document.getElementById("header").style.paddingTop = number+"px";
  }
     $transitions.onStart({}, function ($transitions) {
         
           $timeout( function(){ 
              $rootScope.pathToUse = $transitions._targetState._identifier.name;
                   if($transitions._targetState._identifier.navigable){
                        $rootScope.pathArray = $transitions._targetState._identifier.navigable.path;
                    }
                                    

                     if($rootScope.menuData){
                           
                          
                         //console.log("%%%%%%% R" ,   $rootScope.menuData[0]['children'][0]['data'].page, document.getElementById($rootScope.pathToUse));
                         
                        if( $rootScope.pathToUse === '' || $rootScope.pathToUse === 'base' ){
                                 $rootScope.activeTab = -1;
                        }else{
                             
                            for(var i = 0; i < $rootScope.menuData[0]['children'].length; i++){
                              
                                if($rootScope.menuData[0]['children'][i]['data'].page === $rootScope.pathToUse){
                                     if(!$rootScope.subPathBoolean){
                                        $rootScope.activeTab = parseInt(i);
                                         
                                    // 
                                     }
                                }else{
                                      
                                  //  document.getElementById($rootScope.menuData[0]['children'][i]['data'].page).setAttribute("class", "");
                                }
                            }
                         }
                       //  for(var item in  $rootScope.menuData[0].children){
                            
                     //   if( $rootScope.pathToUse === 'base'){
                       //     $rootScope.activeTab = 0;
                         //   $rootScope.activeSubTab = 0;
                        //} else if( $rootScope.menuData[0].children[item].data.page === $rootScope.pathToUse){
                         //       
                           // $rootScope.activeTab = parseInt(item)-1;
                            //$rootScope.activeSubTab = 0;
                           
                        //} 
                        
                      //  }
                 }
                    
                    
            } );
          

          
     });
    
}]);
app.filter('capitalize', function() {
    return function(token) {
        var stringTotest = '';
        for(var tt = 0; tt < (token).split(" ").length; tt++){
            var tok = (token).split(" ")[tt];
            stringTotest += tok.charAt(0).toUpperCase() + tok.slice(1) +" ";
        }
      return   stringTotest;
   }
});

 