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
    $rootScope.applicationHeaderColor='#72a7e7';
    $rootScope.applicationHeaderColorSecondary='#4F81BD';
    $rootScope.applicationHeaderColorSelect = '#4F81BD';
    $rootScope.applicationHeaderColorBudget = ' #bdbdbd';
    $rootScope.applicationHeaderColorLastYear = '#e91042';
    $rootScope.mainData = {"timeoutBlockout":false};
    $rootScope.showView = true;
    $rootScope.activeSubTab = 0;
    $rootScope.subPathBoolean = false;
    $rootScope.innerHeight = window.innerHeight;
    $rootScope.innerWidth = window.innerWidth ;
    $rootScope.defaultOffSet = 70;
    $rootScope.topOffSet = $rootScope.defaultOffSet ;
    $rootScope.selectedsubParentPage = '';
    $rootScope.topOffSetPageView = $rootScope.topOffSet+60;
    $rootScope.hasNum = [];
    $scope.print={};
    $scope.print.pageOrientation = "Landscape";
    $scope.print.pageSize = "A3";
    $rootScope.desktop = false;
     
        var ua = navigator.userAgent;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
            $rootScope.desktop = false;

         } else if (/Chrome/i.test(ua)){
            $rootScope.desktop = false;

         }else{
            $rootScope.desktop = true;
         }
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
            settingsMeasure: 'String',
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
            monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
             schedule:{
            2018:{
                0:{key:'Take a deep breath',icon:'fa-coffee',dateStart:'10/01/2018', dateEnd:'10/01/2018'},
                1:{key:'Kick Off',icon:'fa-futbol-o', dateStart:'10/02/2018', dateEnd:'11/02/2018'},
                2:{key:'Planning Application Open',icon:'fa-unlock-alt',dateStart:'10/03/2018', dateEnd:'10/03/2018'},
                3:{key:'First Pass Review',icon:'fa-eye',dateStart:'10/04/2018', dateEnd:'10/04/2018'},
                4:{key:'Review Guidlines Published',icon:'fa-print',dateStart:'10/05/2018', dateEnd:'10/05/2018'},
                5:{key:'Second Pass Review',icon:'fa-eye',dateStart:'10/06/2018', dateEnd:'10/09/2018'},
                6:{key:'Department Presentations',icon:'fa-play',dateStart:'10/10/2018', dateEnd:'10/11/2018'},
                7:{key:'Final Plan Published',icon:'fa-flag-checkered',dateStart:'10/11/2018', dateEnd:'10/12/2018'}
            },
            2019:{
                0:{key:'Take a deep breath',icon:'fa-coffee',dateStart:'10/01/2019', dateEnd:'10/01/2019'},
                1:{key:'Kick Off',icon:'fa-futbol-o', dateStart:'10/02/2019', dateEnd:'11/02/2019'},
                2:{key:'Planning Application Open',icon:'fa-unlock-alt',dateStart:'10/03/2019', dateEnd:'10/03/2019'},
                3:{key:'First Pass Review',icon:'fa-eye',dateStart:'10/04/2019', dateEnd:'10/04/2019'},
                4:{key:'Review Guidlines Published',icon:'fa-print',dateStart:'10/05/2019', dateEnd:'10/05/2019'},
                5:{key:'Second Pass Review',icon:'fa-eye',dateStart:'10/06/2019', dateEnd:'10/09/2019'},
                6:{key:'Department Presentations',icon:'fa-play',dateStart:'10/10/2019', dateEnd:'10/11/2019'},
                7:{key:'Final Plan Published',icon:'fa-flag-checkered',dateStart:'10/11/2019', dateEnd:'10/12/2019'}
            }
        }
    };
    $rootScope.applicationTriggerFindUser = function(){
        $rootScope.countIdel = 0;
        $rootScope.idelTimePassed = false;
        //console.log("checking the user loged in ");
        $tm1Ui.applicationUser($rootScope.defaults.settingsInstance).then(function(result){
             $rootScope.userLoggedOut = false;
        });
       
            
  
            
        
    }
    $rootScope.userLoggedOut = false;
     
    

    $rootScope.closeApplication = function(view){
      if(!$rootScope.scheduleShow){
           $tm1Ui.applicationLogout($rootScope.defaults.settingsInstance).then(function(result){
                if(result['success']){
                   // console.log("USE LOGGED OUT", $rootScope.user);
                    $rootScope.userLoggedOut = true;
                    $rootScope.showView = false;
                    

                    
                }else{
                   
                    $rootScope.showView = true;
                }
            });
      }
             
         
        

    }
    $rootScope.selections={
        year:'',
        region:'',
        Department:''
    };
    
    $rootScope.logout = function(sessionname){
       // console.log(sessionname);

    }
    $rootScope.date = new Date() ;
    $rootScope.date  = ((($rootScope.date+"").split(":")[0]).split(',').join('')).split(' ').join('')
  //  console.log($rootScope.date, "date");
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
            $rootScope.refreshCalendar = function(){
                console.log("REFRESH CALENDAR");
                $rootScope.loading = true;
                $timeout(function(){
                    $rootScope.loading = false;
                }, 1000)
            }
            //Initialize all variables
        $scope.updateSettings = function (values, defaults, selections, parameter, options){
            
             
            
            globals.updateSettings(values, defaults, selections, parameter, options); 
            $timeout(function(){
                 $rootScope.refreshCalendar();
            })
             
            //console.log($scope.defaults.year, $scope.defaults.version, $scope.defaults.region, $scope.defaults.department, $scope.defaults.homeSubset, $scope.defaults.homeAccount);
           
        }

             

            //Run Initialization
          
        
  $scope.getLeftMargin = function(idname){
    if(document.getElementById(idname) ){
      //  console.log(document.getElementById(idname).getBoundingClientRect().left  );
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
            if(document.getElementById("stickyContainer")){
                 document.getElementById("stickyContainer").style.width = "100%";
            } 
           document.getElementById("righthandsidebar").style.marginLeft = (-300)+"px";
       }else{
            if(document.getElementById("stickyContainer")){
                document.getElementById("stickyContainer").style.width = (window.innerWidth -300)+"px";
            }
           document.getElementById("righthandsidebar").style.marginLeft = (0)+"px";
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

    $rootScope.createCSSSelector('.tm1-login-modal','pointer-events:none; background-repeat: no-repeat; background-attachment: fixed; background-position: top center; background-color: '+$rootScope.applicationHeaderColor+';');
    $rootScope.createCSSSelector('.tm1-login-modal .panel-default > .panel-heading', 'color: #fff; padding-top: 40px; padding-bottom: 20px; background-repeat: no-repeat; background-position: 50% 50%; border-color: transparent; background-color: '+$rootScope.applicationHeaderColor+' !important;');
    $rootScope.createCSSSelector('.right-hand-nav', 'position:fixed; left:100%; height:100%; width:300px; background-color: '+$rootScope.applicationHeaderColorSecondary+'; top:0px; -webkit-transition: margin-top 500ms ease-out ; -moz-transition: margin-top 500ms ease-out ; -o-transition: margin-top 500ms ease-out ; transition: margin-top 500ms ease-out ; ');
    $rootScope.createCSSSelector('.navbuttons .active', 'display: inline-block; vertical-align: top; background-color: '+$rootScope.applicationHeaderColorSecondary+'; border: 0px solid #ddd; color: #fff !important; ');
    $rootScope.createCSSSelector('.selected-bg',' background-color: '+$rootScope.applicationHeaderColorSelect+'; color:#fff; ');
    $rootScope.createCSSSelector('.bullet .actual.a','  fill:  '+$rootScope.applicationHeaderColorSelect+'; ');
    $rootScope.createCSSSelector('.bullet .measure.d0','  fill: '+$rootScope.applicationHeaderColorBudget+' ');
    $rootScope.createCSSSelector('.bullet .marker','  stroke: '+$rootScope.applicationHeaderColorLastYear+'; stroke-width: 2px; ');
     
     $rootScope.createCSSSelector('.btn-primary' ,'color: #fff; background-color: '+$rootScope.applicationHeaderColorSecondary+' !important; border-color:' +$rootScope.applicationHeaderColorSecondary+'');
 
  

      $rootScope.countIdel = 0;
    $rootScope.mouseMovedSetXY = function($event){
       $rootScope.windowclientX = event.clientX;     // Get the horizontal coordinate
        $rootScope.windowclientY = event.clientY; 
       // console.log(event.x, event.y);
        $scope.mouseMovedXY = event.x+' '+event.y;
        if($rootScope.idelTimePassed){
            if(!$rootScope.loggedOut){
                $tm1Ui.applicationUser($rootScope.defaults.settingsInstance).then(function(result){
                if(result){
                    if(result['IsActive']){
                   // console.log(result, "LOGIN INFO");
                        $rootScope.alpha = 0; 
                        $rootScope.loggedOut = false;
                        $rootScope.idelTimePassed =false;
                        $rootScope.runTimeout(); 
                    }else{
                        
                         
                            $rootScope.loggedOut = true;
                             
                    }
                }else{
                        
                       $rootScope.loggedOut = true;
                            
                }
                 
                
            });
            }
            
        }
         

        
      
        
       
    }
    $rootScope.idelTimePassed =false;
    $rootScope.alpha = 0;
    $rootScope.runTimeout = function(){
    if(!$rootScope.scheduleShow && $rootScope.mainData["timeoutBlockout"] ){
        $timeout(
            function(){
 
                if($rootScope.countIdel > 60){
                      
                    if($scope.mouseMovedXY === $scope.lastMovedXY){
                         //console.log("running timeout",$rootScope.alpha, $rootScope.countIdel,  $scope.lastMovedXY, $scope.mouseMovedXY);
                        if($rootScope.alpha >= 0.9){
                            $rootScope.idelTimePassed = true;
                            $rootScope.countIdel = 251;
                            $rootScope.alpha  = 0.9;
                        }else{
                              $rootScope.idelTimePassed = true;
                              $rootScope.countIdel = 0;
                              $rootScope.runTimeout();
                        }
                        
                        
                          
                    }else{
                        //console.log($rootScope.countIdel, $scope.mouseMovedXY,  $scope.lastMovedXY,  "mouse moved");
                        $rootScope.loggedOut = false;
                         
                        $rootScope.idelTimePassed = false;
                        $rootScope.countIdel = 0;
                        
                        $rootScope.runTimeout();
                    }
                    $scope.lastMovedXY = $scope.mouseMovedXY;

                }else{
                    if($rootScope.countIdel === 0){
                        $scope.lastMovedXY = $scope.mouseMovedXY;
                    }
                   
                    if( $rootScope.idelTimePassed  ){ 
                           
                           // console.log("STARTED PAUSE HIDING INFO");
                           if($scope.mouseMovedXY === $scope.lastMovedXY){
                                $rootScope.alpha = 0.9; 
                               // $rootScope.closeApplication(false);
                                 $rootScope.showView = false;
                           //$rootScope.activeTab = -2;
                           }
                        
                    } 
                   console.log("count",  $rootScope.desktop, $rootScope.countIdel,$scope.lastMovedXY, $scope.mouseMovedXY); 
                    $rootScope.countIdel++; 
                    $rootScope.runTimeout();
                }
                
            },1000
        )
        }
    }
     
    $rootScope.runTimeout();
    $rootScope.birdsKilled = 0;
    $rootScope.birdKilledArray = [];
    $rootScope.birdsCapturedCount = 0;
    $rootScope.doBirdKill = function(bird){
        $rootScope.birdsKilled = $rootScope.birdsKilled +1;
        //console.log("kill bird ",bird );
    }
    $rootScope.getRandomArbitrary = function(min, max) {
        return Math.abs( Math.random() * (max - min) + min);
    }
    

    //$rootScope.overRideDate = '02/10/2019';
    $rootScope.setYear = '2019';
    if($rootScope.overRideDate != '' && $rootScope.overRideDate){
        $rootScope.dateNow = new Date($rootScope.overRideDate) ;
    }else{
        $rootScope.dateNow = new Date() ;
    }
    
    //console.log(" $rootScope.dateNow",  $rootScope.dateNow, (($rootScope.dateNow+"").split(":")[0]).split(' ')[2]);
    $rootScope.dateNumber =(($rootScope.dateNow+"").split(":")[0]).split(' ')[2];
    $rootScope.date  = ((($rootScope.dateNow+"").split(":")[0]).split(',').join('')).split(' ').join('');
    //console.log($rootScope.dateNumber, $rootScope.dateNow,"$rootScope.dateNumber$rootScope.dateNumber");   
    if($rootScope.overRideDate && $rootScope.overRideDate != ''){
         var d = new Date($rootScope.overRideDate);
    }else{
        var d = new Date();
    }
    $scope.hasNum = [];
    var n = d.getMonth();
    var p = d.getDay();
    var y = d.getFullYear();
    $rootScope.date = n;
    $rootScope.monthNow = n;
    $rootScope.dayNow = p;
    $rootScope.yearNow =  y;
   // console.log($rootScope.date);
    console.log($rootScope.dayNow,$rootScope.monthNow,$rootScope.yearNow)
    $rootScope.daysRemainingValue = [];
    $rootScope.daysRemaining = function(datetoset, month) {
        $rootScope.daysRemainingValue[month] = [];
        var splitdatetoset = (datetoset).split('/');
        var eventdate = moment(splitdatetoset[2]+"-"+splitdatetoset[1]+"-"+splitdatetoset[0]);
        if($rootScope.overRideDate != ''){
             var todaysdate = moment($rootScope.overRideDate);
        }else{
              var todaysdate = moment();
        }
        
        $rootScope.daysRemainingValue[month] = eventdate.diff(todaysdate, 'days');
       // console.log($rootScope.daysRemainingValue[month]);
    }
    


 $rootScope.days = [];
    $rootScope.firstDayPosition = [];
      

    function timenow(){
        var now= new Date(), 
        ampm= 'am', 
        h= now.getHours(), 
        m= now.getMinutes(), 
        s= now.getSeconds();
        if(h>= 12){
            if(h>12) h -= 12;
            ampm= 'pm';
        }

        if(m<10) m= '0'+m;
        if(s<10) s= '0'+s;
        return now.toLocaleDateString()+ ' ' + h + ':' + m + ':' + s + ' ' + ampm;
    }
    $scope.loading = false;
    $scope.doUpdate = function(){
        $scope.loading = true;
        $scope.hasNum = [];
        $rootScope.days = [];
        
        $timeout( function(){ 
        
        $scope.loading = false;
       
    },1000); 
    }
    //$rootScope.calendarDaySelected = $rootScope.dateNow;
    $rootScope.calendarMonthSelected = $rootScope.monthNow;
    $rootScope.calendarYearSelected = $rootScope.selections.year;
    $rootScope.showScheduleCard = function(y,m,d){
        $rootScope.calendarDaySelected = (d)+1;
        $rootScope.calendarMonthSelected = $rootScope.defaults.monthkey[($rootScope.defaults.months).indexOf(m)];
         $rootScope.calendarYearSelected = y;
        console.log("Month selected", $rootScope.calendarDaySelected , ($rootScope.defaults.months).indexOf(m)+1 , $rootScope.calendarYearSelected );
        $rootScope.calendarDateSelected = $rootScope.calendarDaySelected+'/'+$rootScope.calendarMonthSelected+'/'+$rootScope.calendarYearSelected;
       


        console.log(y,m,d ,$rootScope.hasNum[y][m][d],"year month and day of the clicked day item")
    }
    $scope.editEvent = function(date){
        console.log("Add event, ",date);
        $timeout(

            function(){
                $('#editEventModal').modal();
            },100
        )
    }
    $scope.createNewEvent = function(date){
        console.log("create New Event",date);
        $timeout(

            function(){
                $('#createEventModal').modal();
            },100
        )
    }
    $scope.parseToDateFormat = function(val){
        var tempval = val;    
        if(val < 10){
            tempval = '0'+val;
        }
        return tempval;
    }
    $scope.seeDetails = function(date){ 
        var arraytemp = (date+'').split('/');
        var daytemp = $scope.parseToDateFormat(arraytemp[0]);
        var monthtemp = $scope.parseToDateFormat(arraytemp[1]);
        var yeartemp = arraytemp[2];


        $rootScope.calendarDate = moment(yeartemp+'-'+monthtemp+'-'+daytemp).format("dddd, MMMM Do YYYY");
        ;
        $timeout(

            function(){
                $('#detailsModal').modal();
            },100
        )
        
        console.log("See Event Details",date);
    }
    $rootScope.openModal = function(item){
        console.log(item);
        $rootScope.showView = true;
        $rootScope.scheduleShow = false;
        //$scope.goToNewPage('#/sticky-header');

    }
    $rootScope.getDaysInMonth = function(month,year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        $rootScope.firstDayPosition[month] =  [];
        var firstDayPositionArray = [];
        var firstDayPosition =new Date(year, month, 0).getDay();
        
        for(var yh = 0; yh < firstDayPosition;yh++){
            firstDayPositionArray.push(yh);
        }
        $scope.firstDayPosition[month] = firstDayPositionArray;
       // console.log("first day position", firstDayPosition, $scope.firstDayPosition[month]);
        var days  = new Date(year, month+1, 0).getDate();
        var mypreArray = [];
       // console.log(days);
         for(var ttg = 0; ttg < days; ttg++){
            mypreArray.push(ttg)
         }
        // console.log('days in month', month, days, mypreArray );
         $rootScope.days[month] = mypreArray;
       // retu$scorn mypreArray;
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };
 
    $scope.goToNewPage = function(url){
        location.assign(url)
    }
     
   
    $rootScope.findColorByHr = function(color){
             var m = moment($rootScope.overRideDate);
             console.log(m);
            var g = null; //return g
            
            if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
            
            var split_afternoon = 12 //24hr time to split the afternoon
            var split_evening = 17 //24hr time to split the evening
            var currentHour = parseFloat(m.format("HH"));
            console.log(currentHour)
            if(currentHour >= split_afternoon && currentHour <= split_evening) {
                g = "transparent";
            } else if(currentHour >= split_evening) {
                g = "#000000"+"c9";
            } else {
                g ="transparent";
            }
            console.log(g )
            return g;
        
    }

    $rootScope.findLengthOfJsonObg=  function(data){
        return _.keys(data).length
    }
    $rootScope.getContainerTop = function(id, bottomOffset){
        
        if(document.getElementById(id)){
           //  console.log(id, bottomOffset, document.getElementById(id));
            var tempObjToTrack = document.getElementById(id);
            if(tempObjToTrack != null || tempObjToTrack != undefined ){
                return tempObjToTrack.getBoundingClientRect().top;
            }
        }
    }
    
    $rootScope.setContainerHeight = function(id, bottomOffset){
        if(document.getElementById(id)){
            var tempObjToTrack = document.getElementById(id);
            if(tempObjToTrack != null || tempObjToTrack != undefined ){
                return (( (window.innerHeight) - (tempObjToTrack.getBoundingClientRect().top)-bottomOffset ));
            }
        }
    }
    
    $(window).resize(function() { 
        $timeout(
            function(){
        $rootScope.innerHeight = window.innerHeight;
        $rootScope.innerWidth = window.innerWidth ;
            }
        )
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

 