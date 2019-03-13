(function(){
        var app = angular.module('app');
        app.directive('calendar', ['$log','$rootScope','$tm1Ui', '$timeout', function($log, $rootScope, $tm1Ui, $timeout ) {
            return {
                templateUrl: 'html/Calendar.html',
                scope:{
                    tm1Instance: '@', 
                    selectedYear:'@'
                   
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.defaults = {  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                    monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                };
                 
                 
                scope.selections = {};
                scope.firstDayPosition = {};
                scope.instance = $attributes.tm1Instance;
                scope.selections.year = $attributes.selectedYear;

                console.log(scope.instance, scope.selections.year);
                scope.hasNum = [];
    scope.setYear = '2019'; 
    scope.itemList = [];
    scope.selections.dateToSee = false;
    $rootScope.selections.dateCreateNew = false;
    scope.days = [];
    scope.firstDayPosition = [];
    $rootScope.daysRemainingValue = [];
    scope.overRideDate = '';
    if(scope.overRideDate != '' && scope.overRideDate){
        scope.dateNow = new Date(scope.overRideDate) ;
    }else{
        scope.dateNow = new Date() ;
    }
    
    var n = scope.dateNow.getMonth();
    var p = scope.dateNow.getDay();
    var y = scope.dateNow.getFullYear();
    scope.monthNow = n;
    $rootScope.dayNow = p;
    $rootScope.yearNow =  y; 
    $rootScope.dateNumber =((scope.dateNow+"").split(":")[0]).split(' ')[2];
    $rootScope.date  = (((scope.dateNow+"").split(":")[0]).split(',').join('')).split(' ').join('');
      
    
     
    
    
    scope.calendarDateSelected = $rootScope.dateNumber+"/"+ $rootScope.calendarMonthSelected+"/"+ scope.selections.year;
     
   
    $rootScope.refreshCalendar = function(){
       
        $rootScope.loading = true;
        $timeout(function(){
              $timeout(function(){
                $rootScope.loading = false;
                
               scope.loadcalendarYearIsHere();
             }, 1000)
            
        })
    }

    
    scope.loadcalendarYearIsHere = function(){
        if(scope.selections.dateToSee){

        }else{
            scope.calendarDaySelected = parseInt($rootScope.dateNumber); 
            $rootScope.calendarMonthSelected = scope.includeZeroForNum(scope.monthNow+1);
            $rootScope.calendarYearSelected = $rootScope.defaults.year;
            scope.calendarDateSelected = $rootScope.dateNumber+"/"+ $rootScope.calendarMonthSelected+"/"+ $rootScope.calendarYearSelected;
        }
        if(scope.selections.year){
            
            $rootScope.query(true); 
            
        } 
    } 
    scope.returnDateInReverse = function(date){
        var dateArray = (date+'').split('/');
        return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
    }

    $rootScope.query = function(loading){
		$rootScope.loading = loading;
		// Create data set
		// based on the MDX statement from the \WEB-INF\resources\mdx_named.json file
        
     
         
        $tm1Ui.cubeExecuteNamedMdx('dev', "Calendar", {parameters: { "Period":$rootScope.defaults.year, "Client":$rootScope.user.FriendlyName} }).then(function(result){
			if(!result.failed){
                $rootScope.dataset = $tm1Ui.resultsetTransform("dev", "Calendar", result, {alias: {"}Clients": "}TM1 DefaultDisplayValue", Version: "Description"}});
				var options = {preload: false, watch: false};
				if(scope.table){
                   
					options.index = scope.table.options.index;
					options.pageSize = scope.table.options.pageSize;
				}
				scope.table = $tm1Ui.tableCreate($rootScope, $rootScope.dataset.rows, options);
                scope.table.pageSize(10000);
             
                $tm1Ui.dataRefresh();
			}
			else {
				$rootScope.message = result.message;
			}		
			$rootScope.loading = false;
            
		});		
        
	};
	scope.includeZeroForNum = function(num){
        if(parseInt(num) < 10){
            return '0'+ (num+'');

        }else{
             return  num;
        }
    }
     
	 $rootScope.daysRemaining = function(datetoset) {
       
          
        var eventdate = moment(datetoset);
        if(scope.overRideDate != ''){
             var todaysdate = moment(scope.overRideDate);
        }else{
              var todaysdate = moment();
        }
        
         return eventdate.diff(todaysdate, 'days');
       
    }
     
 
    scope.showScheduleCard = function(y,m,d, decider){
        $rootScope.selections.dateCreateNew = true;
        if(decider){
            scope.selections.dateToSee = true;
            
            scope.calendarDaySelected = (d)+1;
            $rootScope.calendarFilterDaySelected = scope.parseToDateFormat((d)+1);
            $rootScope.calendarMonthSelected = scope.defaults.monthkey[(scope.defaults.months).indexOf(m)];
            $rootScope.calendarYearSelected = y;
           // console.log("Month selected", $rootScope.calendarDaySelected , (scope.defaults.months).indexOf(m)+1 , $rootScope.calendarYearSelected );
            scope.calendarDateSelected = $rootScope.calendarFilterDaySelected+'/'+$rootScope.calendarMonthSelected+'/'+$rootScope.calendarYearSelected;
       
        }else{
            scope.selections.dateToSee = true;
              
            $rootScope.calendarFilterDaySelected = scope.parseToDateFormat((d)+1);
            scope.calendarDaySelected = (d)+1;
            $rootScope.calendarMonthSelected = scope.defaults.monthkey[(scope.defaults.months).indexOf(m)];
            $rootScope.calendarYearSelected = y;
          //  console.log("Month selected", $rootScope.calendarDaySelected , (scope.defaults.months).indexOf(m)+1 , $rootScope.calendarYearSelected );
            scope.calendarDateSelected = $rootScope.calendarFilterDaySelected+'/'+$rootScope.calendarMonthSelected+'/'+$rootScope.calendarYearSelected;
        }
        $timeout(
            function(){
                 $rootScope.captureFirstItem($rootScope.eventName);
            },1000
        )
        
         


       
    }
  
    $rootScope.captureFirstItem = function(array){
        $rootScope.itemDeleted = 0;
        for(var sad =0; sad < array.length;sad++ ){
            console.log(array[sad]);
            if(array[sad] != ''){
                $rootScope.itemDeleted++;
            }
        }
        console.log($rootScope.itemDeleted+'items deleted from view')
    }
    scope.editEvent = function(date){
        console.log("Add event, ",date);
        $timeout(

            function(){
                $('#editEventModal').modal();
            },100
        )
    }
    scope.createNewEvent = function(date){
        console.log("create New Event",date);
        $timeout(

            function(){
                $('#createEventModal').modal();
            },100
        )
    }
    scope.parseToDateFormat = function(val){
        var tempval = val;    
        if(val < 10){
            tempval = '0'+val;
        }
        return tempval;
    }
    
    $rootScope.openModal = function(item){
         
        $rootScope.showView = true;
        $rootScope.scheduleShow = false;
        scope.goToNewPage('#/'+item);

    }
    scope.getDaysInMonth = function(month,year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        scope.firstDayPosition[month] =  [];
        var firstDayPositionArray = [];
        var firstDayPosition =new Date(year, month, 0).getDay();
        
        for(var yh = 0; yh < firstDayPosition;yh++){
            firstDayPositionArray.push(yh);
        }
        scope.firstDayPosition[month] = firstDayPositionArray;
         console.log("first day position", firstDayPosition, scope.firstDayPosition[month]);
        var days  = new Date(year, month+1, 0).getDate();
        var mypreArray = [];
       // console.log(days);
         for(var ttg = 0; ttg < days; ttg++){
            mypreArray.push(ttg)
         }
        // console.log('days in month', month, days, mypreArray );
         scope.days[month] = mypreArray;
       // retu$scorn mypreArray;
        // Here January is 0 based
        // return new Date(year, month+1, 0).getDate();
    };
    
    $rootScope.deleteEvent = function(rowJson, referenceElements){
        var myArrayToSend = [];
        _.forEach(rowJson.cells, function(value, key) {
            var ref = value.reference();
            //console.log(key, value.reference(), "reference from inside the controller");
            myArrayToSend.push({value:'', instance:'dev', cube:'Calendar', cubeElements:ref});
        });
        console.log(myArrayToSend, "row to delete");
        $tm1Ui.cellsetPut(myArrayToSend).then(function(result){
            if(!result.failed){
                 console.log(result, "cleared event");
                 scope.hasNum = []; 
                 
                  $rootScope.query(true); 
                   $tm1Ui.dataRefresh();
            }else{
                 console.log(result.message);
            }
            
       
        });
    }
    scope.saveItem = function(rowJson, referenceElements, userRefElements){
        var myArrayToSave = [];
        myArrayToSave.push({value:'New', instance:'dev', cube:'Calendar', cubeElements:referenceElements});
        myArrayToSave.push({value:$rootScope.user.FriendlyName, instance:'dev', cube:'Calendar', cubeElements:userRefElements});
       
        $tm1Ui.cellsetPut(myArrayToSave).then(function(result){
            if(!result.failed){
                 console.log(result, "added new event");
                    scope.hasNum = []; 
                    $rootScope.openEventCreate  = false;
                    $rootScope.query(true); 
                   
            }else{
                 console.log(result.message);
            }
            
       
        });
    }
    
    scope.createEvent = function(){
        console.log("new event to create");
        $rootScope.captureFirstItem($rootScope.eventName);
    }
    scope.goToNewPage = function(url){
        location.assign(url)
    }
    

    
    
 

                scope.$watch(function () {
                    return $attributes.selectedYear;
                    
                    }, function (newValue, oldValue) { 
                        scope.selections.year = newValue;
                        $rootScope.refreshCalendar(); 
                        console.log(newValue, "Year changes inside directive");
                                
                    })
 
                }
            };
        }]);
        
   
})();