(function(){
        var app = angular.module('app');
        app.directive('calendar', ['$log','$rootScope','$tm1Ui', '$timeout', function($log, $rootScope, $tm1Ui, $timeout ) {
            return {
                templateUrl: 'html/Calendar.html',
                scope:{
                    tm1Instance: '@', 
                    selectedYear:'@',
                    cubeName:'@',
                    user:'@'
                   
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.defaults = {  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                    monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                };
                scope.user = $attributes.user;
                scope.cubeName = $attributes.cubeName;
                scope.selections = {};
                scope.firstDayPosition = {};
                scope.instance = $attributes.tm1Instance;
                scope.selections.year = $attributes.selectedYear;
                scope.defaultOffSet = 57;
                console.log(scope.instance, scope.selections.year);
                scope.hasNum = [];
                scope.innerHeight = window.innerHeight;
                scope.innerWidth = window.innerWidth ;
    scope.setYear = '2019'; 
    scope.itemList = [];
    scope.selections.dateToSee = false;
    scope.selections.dateCreateNew = false;
    scope.days = [];
    scope.firstDayPosition = [];
    scope.daysRemainingValue = [];
    scope.overRideDate = '';
   
    scope.eventName = [];
    if(scope.overRideDate != '' && scope.overRideDate){
        scope.dateNow = new Date(scope.overRideDate) ;
    }else{
        scope.dateNow = new Date() ;
    }
    
    var n = scope.dateNow.getMonth();
    var p = scope.dateNow.getDay();
    var y = scope.dateNow.getFullYear();
    scope.monthNow = n;
    scope.dayNow = p;
    scope.yearNow =  y; 
    scope.dateNumber =((scope.dateNow+"").split(":")[0]).split(' ')[2];
    scope.date  = (((scope.dateNow+"").split(":")[0]).split(',').join('')).split(' ').join('');
      
    
     
    
    
    scope.calendarDateSelected = scope.dateNumber+"/"+ scope.calendarMonthSelected+"/"+ scope.selections.year;
     
   
    scope.refreshCalendar = function(){
       
        scope.loading = true;
        $timeout(function(){
              $timeout(function(){
                scope.loading = false;
                
               scope.loadcalendarYearIsHere();
             }, 1000)
            
        })
    }

    
    scope.loadcalendarYearIsHere = function(){
        if(scope.selections.dateToSee){

        }else{
            scope.calendarDaySelected = parseInt(scope.dateNumber); 
            scope.calendarMonthSelected = scope.includeZeroForNum(scope.monthNow+1);
            scope.calendarYearSelected = scope.selections.year;
            scope.calendarDateSelected = scope.dateNumber+"/"+ scope.calendarMonthSelected+"/"+ scope.calendarYearSelected;
        }
        if(scope.selections.year){
            
            scope.query(true); 
            
        } 
    } 
    scope.returnDateInReverse = function(date){
        var dateArray = (date+'').split('/');
        return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
    }

    scope.query = function(loading){
		scope.loading = loading;
		// Create data set
		// based on the MDX statement from the \WEB-INF\resources\mdx_named.json file
        
     
         
        $tm1Ui.cubeExecuteNamedMdx('dev', "Calendar", {parameters: { "Period":scope.selections.year, "Client":scope.user} }).then(function(result){
			if(!result.failed){
                scope.dataset = $tm1Ui.resultsetTransform("dev", "Calendar", result, {alias: {"}Clients": "}TM1 DefaultDisplayValue", Version: "Description"}});
				var options = {preload: false, watch: false};
				if(scope.table){
                   
					options.index = scope.table.options.index;
					options.pageSize = scope.table.options.pageSize;
				}
				scope.table = $tm1Ui.tableCreate(scope, scope.dataset.rows, options);
                scope.table.pageSize(10000);
             
                $tm1Ui.dataRefresh();
			}
			else {
                console.log(result.message);
			}		
			scope.loading = false;
            
		});		
        
	};
	scope.includeZeroForNum = function(num){
        if(parseInt(num) < 10){
            return '0'+ (num+'');

        }else{
             return  num;
        }
    }
     
	 scope.daysRemaining = function(datetoset) {
       
          
        var eventdate = moment(datetoset);
        if(scope.overRideDate != ''){
             var todaysdate = moment(scope.overRideDate);
        }else{
              var todaysdate = moment();
        }
        
         return eventdate.diff(todaysdate, 'days');
       
    }
     
     scope.captureFirstItem = function(array){
       scope.itemDeleted = 0;
        for(var sad =0; sad < array.length;sad++ ){
           
            if(array[sad] != ''){
               scope.itemDeleted++;
            }
        }
   
    }
    scope.showScheduleCard = function(y,m,d, decider){
        scope.selections.dateCreateNew = true;
        if(decider){
            scope.selections.dateToSee = true;
            
            scope.calendarDaySelected = (d)+1;
            scope.calendarFilterDaySelected = scope.parseToDateFormat((d)+1);
            scope.calendarMonthSelected = scope.defaults.monthkey[(scope.defaults.months).indexOf(m)];
            scope.calendarYearSelected = y;
            scope.calendarDateSelected = scope.calendarFilterDaySelected+'/'+scope.calendarMonthSelected+'/'+scope.calendarYearSelected;
       
        }else{
            scope.selections.dateToSee = true;
              
            scope.calendarFilterDaySelected = scope.parseToDateFormat((d)+1);
            scope.calendarDaySelected = (d)+1;
            scope.calendarMonthSelected = scope.defaults.monthkey[(scope.defaults.months).indexOf(m)];
            scope.calendarYearSelected = y;
            scope.calendarDateSelected = scope.calendarFilterDaySelected+'/'+scope.calendarMonthSelected+'/'+scope.calendarYearSelected;
        }
        $timeout(
            function(){
                 scope.captureFirstItem(scope.eventName);
            },1000
        )
        
         


       
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
    
    scope.openModal = function(item){
         
        $rootScope.showView = true;
        scope.scheduleShow = false;
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
        //console.log("first day position", firstDayPosition, scope.firstDayPosition[month]);
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
    
    scope.deleteEvent = function(rowJson, referenceElements){
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
                 
                  scope.query(true); 
                   $tm1Ui.dataRefresh();
            }else{
                 console.log(result.message);
            }
            
       
        });
    }
    scope.saveItem = function(rowJson, referenceElements, userRefElements){
        var myArrayToSave = [];
        myArrayToSave.push({value:'New', instance:'dev', cube:'Calendar', cubeElements:referenceElements});
        myArrayToSave.push({value:scope.user, instance:'dev', cube:'Calendar', cubeElements:userRefElements});
       
        $tm1Ui.cellsetPut(myArrayToSave).then(function(result){
            if(!result.failed){
                 console.log(result, "added new event");
                    scope.hasNum = []; 
                    scope.openEventCreate  = false;
                    scope.query(true); 
                   
            }else{
                 console.log(result.message);
            }
            
       
        });
    }
    
    scope.createEvent = function(eventName){
        console.log("new event to create");
        scope.openEventCreate = !scope.openEventCreate;
        scope.captureFirstItem(eventName);
    }
    scope.goToNewPage = function(url){
        location.assign(url)
    }
    

     $(window).resize(function() { 
        
                scope.innerHeight = window.innerHeight;
                scope.innerWidth = window.innerWidth ;
         
    });
    
 

                scope.$watch(function () {
                    return $attributes.selectedYear;
                    
                    }, function (newValue, oldValue) { 
                        scope.hasNum = []; 
                        scope.selections.dateToSee = false; 
                        scope.openEventCreate = false; 
                        scope.selections.dateCreateNew = false; 
                        
                        scope.selections.year = newValue;
                        scope.refreshCalendar(); 
                        console.log(newValue, "Year changes inside directive");
                                
                    })
 
                }
            };
        }]);
        
   
})();