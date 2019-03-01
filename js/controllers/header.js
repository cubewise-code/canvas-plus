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
    $rootScope.applicationHeaderColor='#201c1a ';
    $rootScope.applicationHeaderColorSecondary='#c02626';
    $rootScope.applicationHeaderColorSelect = '#4F81BD';
    $rootScope.applicationHeaderColorBudget = ' #bdbdbd';
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
           document.getElementById("righthandsidebar").style.marginLeft= (-300)+"px";
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

    $rootScope.createCSSSelector = function(selector, style) {
        if (!document.styleSheets) return;
        if (document.getElementsByTagName('head').length == 0) return;

        var styleSheet,mediaType;

        if (document.styleSheets.length > 0) {
            for (var i = 0, l = document.styleSheets.length; i < l; i++) {
            if (document.styleSheets[i].disabled) 
                continue;
            var media = document.styleSheets[i].media;
            mediaType = typeof media;

            if (mediaType === 'string') {
                if (media === '' || (media.indexOf('screen') !== -1)) {
                styleSheet = document.styleSheets[i];
                }
            }
            else if (mediaType=='object') {
                if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
                styleSheet = document.styleSheets[i];
                }
            }

            if (typeof styleSheet !== 'undefined') 
                break;
            }
        }

        if (typeof styleSheet === 'undefined') {
            var styleSheetElement = document.createElement('style');
            styleSheetElement.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

            for (i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].disabled) {
                continue;
            }
            styleSheet = document.styleSheets[i];
            }

            mediaType = typeof styleSheet.media;
        }

        if (mediaType === 'string') {
            for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
            if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
            }
            }
            styleSheet.addRule(selector,style);
        }
        else if (mediaType === 'object') {
            var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
            for (var i = 0; i < styleSheetLength; i++) {
            if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
            }
            }
            styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
        }
    }

    $rootScope.createCSSSelector('.tm1-login-modal .panel-default > .panel-heading', 'color: #fff; padding-top: 40px; padding-bottom: 20px; background-repeat: no-repeat; background-position: 50% 50%; border-color: transparent; background-color: '+$rootScope.applicationHeaderColorSecondary+' !important;');
    $rootScope.createCSSSelector('.right-hand-nav', 'position:fixed; left:100%; height:100%; width:300px; background-color: '+$rootScope.applicationHeaderColorSecondary+'; top:0px; -webkit-transition: margin-top 500ms ease-out ; -moz-transition: margin-top 500ms ease-out ; -o-transition: margin-top 500ms ease-out ; transition: margin-top 500ms ease-out ; ');
    $rootScope.createCSSSelector('.navbuttons .active', 'display: inline-block; vertical-align: top; background-color: '+$rootScope.applicationHeaderColorSecondary+'; border: 0px solid #ddd; color: #fff !important; ');
    $rootScope.createCSSSelector('.selected-bg',' background-color: '+$rootScope.applicationHeaderColorSelect+'; color:#fff; ');
    $rootScope.createCSSSelector('.bullet .actual.a','  fill:  '+$rootScope.applicationHeaderColorSelect+'; ');
    $rootScope.createCSSSelector('.bullet .measure.d0','  fill: '+$rootScope.applicationHeaderColorBudget+' ');
    $rootScope.createCSSSelector('.bullet .marker','  stroke: '+$rootScope.applicationHeaderColorSecondary+'; stroke-width: 2px; ');

      

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

 