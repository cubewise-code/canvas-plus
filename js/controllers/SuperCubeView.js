(function(){
        var app = angular.module('app');
        app.directive('superCubeView', ['$log','$rootScope','$tm1Ui', '$timeout', '$window', function($log, $rootScope, $tm1Ui, $timeout , $window) {
            return {
                templateUrl: 'html/SuperCubeView.html',
                scope:{
                    tm1Instance: '@',  
                    cubeName:'@',
                    cubeView:'@',
                    attributeOptions:'@',
                    tableWidth:'@',
                    tablePosition:'@',
                    tableLeft:'@',
                    tableTop:'@',
                    tableId:'@',
                    tableHeightBottomOffset:'@',
                    tableDimensionColumnClass:'@',
                    tableDataColumnClass:'@',
                   tableId:"@"
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.defaults = {  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                    monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                };
                scope.selections = {};
                scope.firstDayPosition = {};
                scope.tm1Instance = $attributes.tm1Instance;
                scope.cubeView = $attributes.cubeView;
                scope.cubeName = $attributes.cubeName;
                scope.attributeOptions = $attributes.attributeOptions;
                scope.tableWidth = $attributes.tableWidth; 
                scope.innerWidth = window.innerWidth;
                scope.tablePosition = $attributes.tablePosition;
                scope.tableLeft = $attributes.tableLeft;
                scope.tableTop = $attributes.tableTop;
                scope.tableId = $attributes.tableId;

                scope.tableDimensionColumnClass = $attributes.tableDimensionColumnClass;
                scope.tableDataColumnClass = $attributes.tableDataColumnClass;

                scope.dateNow = new Date() ;
            
            
                var n = scope.dateNow.getMonth();
                var p = scope.dateNow.getDay();
                var y = scope.dateNow.getFullYear();
                scope.monthNow = n;
                scope.dayNow = p;
                scope.yearNow =  y; 
                scope.dateNumber =((scope.dateNow+"").split(":")[0]).split(' ')[2];
                //scope.date  = (((scope.dateNow+"").split(":")[0]).split(',').join('')).split(' ').join('');
                
                scope.getTablePosition = function(){
                    return scope.tablePosition;
                }
                scope.getTableLeft = function(){
                    return scope.tableLeft;
                }
                scope.getTableTop = function(){
                    return scope.tableTop;
                }
                 
                scope.getMathMax = function(arr){
                    if(arr){
                       var max = arr.reduce(function(a, b) {
                           return Math.max(a, b);
                       });
                       return 'tm1-ui-element-consol tm1-ui-element-consol-'+(max+'') ;
                    }else{
                        return 'tm1-ui-element-consol tm1-ui-element-consol-'+(0+'');
                    }
                   
                   
                }
                scope.datasetNew = [];
                scope.dataset = []; 
                scope.tableNew = [];
                scope.table = [];
                scope.optionsNew = [];
                scope.options = [];
                scope.refreshNew = function(newdataset){ 
                   
 
                            $tm1Ui.cubeExecuteView(scope.tm1Instance,scope.cubeName, scope.cubeView).then(function(result){
                                if(!result.failed){
                                     
                                    scope.datasetNew[scope.tableId] = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, result, scope.attributeOptions);
                                      
                                    scope.dataset = newdataset;
                                        
                                        scope.optionsNew[scope.tableId] = {preload: false, watch: false};
                                        
                                       scope.tableNew[scope.tableId] = $tm1Ui.tableCreate(scope, scope.datasetNew[scope.tableId].rows, scope.optionsNew[scope.tableId]);
                                       
                                       scope.tablerowLength = scope.tableNew[scope.tableId].data().length;
                                       scope.tableNew[scope.tableId].pageSize(scope.currentRowCount)
                                      // console.log(scope.table.data(), scope.tableNew.data());  
                                       var tableRows = scope.table.data();
                                        for(newrow in scope.tableNew[scope.tableId].data()){
                                            for(row in scope.table.data()){
                                                if(scope.tableNew[scope.tableId].data()[newrow].index === scope.table.data()[row].index){
                                                //console.log(scope.tableNew.data()[newrow].cells, "same row");
                                                   scope.table.data()[row]['cells'] = scope.tableNew[scope.tableId].data()[newrow]['cells'];
                                                } 
                                            }
                                        }
                                        
                                       scope.getLastFocus(); 
                                       
                                } else {
                                   scope.message = result.message; 
                               } 
                              
                           })
                      
                }
           
                scope.getFocus = function($event) {           
                   scope.focusObj = $event.target.id;
                    
                   scope.focusedInputElementArray =  document.getElementById(scope.focusObj).getAttribute('cellref')
                 //console.log("add paste event listener",$event.target.id,scope.focusedInputElementArray )
                }
                scope.addEventListerToInput = function(id){
                   // document.getElementById(id).addEventListener('paste', scope.handlePaste);
                }
                scope.getLastFocus = function() {  
                    if(document.getElementById(scope.focusObj)){
                       document.getElementById(scope.focusObj).focus(); 
                    }  
                }
                scope.lostFocus = function($event) {  

                   var focusObjOut = $event.target.id;
                   scope.focusObj = ''; 
                  // document.getElementById(focusObjOut).removeEventListener('paste', scope.handlePaste);
           
                }   
           
                scope.getContainerWidthClass = function(idName){
                    if(document.getElementsByClassName(idName).length > 0){
                        var tempObj = document.getElementsByClassName(idName)[0];
                        if(tempObj != null || tempObj != undefined ){
                           return tempObj.getBoundingClientRect().width;
                        }
                    } 
                }
                scope.getTableRowLength = function(){
                    return scope.table.data().length;
                }
           
                scope.cellreferenceArray = [];
                scope.dimensionArray = [];
                scope.openRefModel = function(elementString){
                    
                    if((elementString+'').split(',').length > 0){
                        // console.log(elementString, "elementString")

                        scope.cellreferenceArray = (elementString+'').split(',')
                        $tm1Ui.cubeDimensions(scope.tm1Instance,scope.cubeName).then(function(result){
                            scope.dimensionArray = result;
                            scope.getCellDrill(scope.cellreferenceArray);
                             
                        })
                    }
                   
                     
                }
                scope.currentRowCount = 100;
                scope.tablerowLength = 0;
                
                scope.refresh = function(){
                    
                    
                              
                               $tm1Ui.cubeExecuteView(scope.tm1Instance,scope.cubeName, scope.cubeView).then(function(result){
                                   if(!result.failed){
                                        
                                       scope.dataset = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, result, scope.attributeOptions);
                                      
                                       scope.options[scope.tableId] = {preload: false, watch: false};
                                       if(scope.table){
                                           if(scope.table.options){
                                            console.log(scope.table, "scope.tablescope.table")
                                            scope.options[scope.tableId].index = scope.table.options.index;
                                            scope.options[scope.tableId].pageSize = scope.table.options.pageSize;
                                            scope.tablerowLength = scope.table.data().length;
                                           }
                                           
                                            
                                         
                                            
                                       }
                                        scope.table = $tm1Ui.tableCreate(scope, scope.dataset.rows, scope.options[scope.tableId]);
                                        scope.table.pageSize(scope.currentRowCount)
                                        scope.tableDimensionLength =  scope.table.data()[0].elements.length;
                                      //console.log(scope.tableDimensionLength ,"scope.tableDimensionLength ");
                                      
                                        
                                        scope.table = scope.table;
                                        scope.table.refresh();
                                        
                                        
                                       //scope.tableData = scope.table.data();
                                        
                                   } else {
                                       scope.message = result.message;
                                       
                                      
                                   }		
                                  
                               })
                         
                        
                }

                scope.tableData = [];
                scope.tableRowCollapseData = [];
                scope.collapsedRowArray = [];
                
                
                scope.seeNewData = function(data){
                    //console.log(data)
                }
                scope.getColType = function(data){
                    return data;
                }
                
                scope.seeData = function(rowindex,table){
                    
                    scope.dataset.rows[(rowindex)][scope.dataset['dimensions']['rows'][0]]['element'].toggle();
                    scope.table.refresh();
                    scope.refreshNew(scope.dataset);
            
                };
               
                scope.containerishere = false;
           scope.scrollAmountTop = 0;
            scope.setUpFreezePane = function(){
              //console.log("setting up freeze pane", scope.tableId, document.querySelector('#stickyContainer'))
            
                if( document.querySelector('#stickyContainer'+scope.tableId)){
                    scope.containerishere = true;
                    if(scope.excelReformated === false){
                        scope.formatUploadButton();
                    }
                    
                    angular.element(document.querySelector('#stickyContainer'+scope.tableId)).bind('scroll', function(){
                        scope.offsetTop = 0;
                        var el = $('#stickyContainer'+scope.tableId);
                        $body = $(el);  
                        $stickyHeader = $(el).find('#sticky-header');
                        $fixedHeader = $(el).find('.fixed-container');
                        $fixedFirstColHeader = $(el).find('.fixedFirstColHeader');
                        //$headerContent = $(el).find('#headerContent');
                        $sideContent = $(el).find('#sideContent'+scope.tableId);           
                        scope.scrolling = true;
                        $($stickyHeader).css('display','block'); 
                        $($sideContent).css('display', 'block');
                         
                             var valuetoEval = scope.offsetTop;
                       
                             scope.scrollAmountTop =  $($body).scrollTop();
    
                            if($($body).scrollTop() >= parseInt(valuetoEval) || $($body).scrollLeft() >= 0){
        
                                scope.headerOutOffView = true;
                              //console.log("view header")
                                if($($stickyHeader)){
                                    $($stickyHeader).css('display','block'); 
                                    $($stickyHeader).css('opacity','1'); 
                                    $($stickyHeader).css('pointer-events','auto'); 
                                }
                                if($($fixedHeader) && $($fixedFirstColHeader)){
                                    $($fixedHeader).css('pointer-events','auto'); 
                                    $($fixedFirstColHeader).css('display','block !important');
                                }
                               
                               
                                if( $($sideContent)){
                                    $($sideContent).css('display', 'block');
                                    $($sideContent).css('margin-top', -$($body).scrollTop());
                                    
                                    $($sideContent).css('height', (((window.innerHeight - (scope.tableHeightBottomOffset)-(157+(document.getElementById('head'+scope.tableId).getBoundingClientRect().height ) )) )) + $($body).scrollTop());
                                                                    
                                }
                               
                                 
                            }else{
                                 
                                scope.headerOutOffView = false;
                              //console.log("hide header")
                                if($($stickyHeader)){
                                    $($stickyHeader).css('opacity','0'); 
                                    $($stickyHeader).css('pointer-events','none'); 
                                }
                                if($($fixedHeader)){
                                    $($fixedHeader).css('pointer-events','none'); 
                                }
                                if($($fixedFirstColHeader)){
                                    $($fixedFirstColHeader).css('display','none !important'); 
                                }
                                 
                                 
                                 
                                  
                            } 
                             if($($stickyHeader)){
                                $($stickyHeader).css('margin-left', -$($body).scrollLeft());
                             }
                            
                      });
                }else{
                    if(scope.containerishere === true){

                    }else{
                        scope.waitTillContainerArives();
                    }
                    
                }
                
            }
            scope.waitTillContainerArives = function(){
                $timeout(
                    function(){
                        console.log("looking for freezepane");
                        scope.setUpFreezePane();
                    },1000
                )
                
            }
             
            scope.formatUploadButton = function(){
                
                if(document.getElementsByClassName('tm1-ui-export').length){
                   // console.log(document.getElementsByClassName('tm1-ui-export')[0].innerHTML)
                   
                    for(ff = 0; ff < document.getElementsByClassName('tm1-ui-export').length; ff++){
                         
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split('Excel').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split('CSV').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].innerHTML = (document.getElementsByClassName('tm1-ui-export')[ff].innerHTML+'').split(' | ').join('');
                        document.getElementsByClassName('tm1-ui-export')[ff].innerText = '';
                        if(ff === document.getElementsByClassName('tm1-ui-export').length-1){
                            scope.scexcelReformated = true;
                        }
                    }
                    
                }
            }
           
            scope.getTableWidth = function(){
                 return scope.tableWidth ;
                
         
            }
            scope.getTableWidthinPx = function(){
                if(document.getElementById('stickyContainer'+scope.tableId)){
                    return document.getElementById('stickyContainer'+scope.tableId).getBoundingClientRect().width - 12 ;
                }
                 
            }
         
               
              scope.getContainerWidth = function(idName){
                  if(document.getElementById(idName)){
                      var tempObj = document.getElementById(idName);
                      if(tempObj != null || tempObj != undefined ){
                          return tempObj.getBoundingClientRect().width;
                      }
                  }
                  
           
              }
           
              scope.getContainerHeight = function(idName){
                  if(document.getElementById(idName)){
                      var tempObjTwo = document.getElementById(idName);
                      if(tempObjTwo != null || tempObj != undefined ){
                          return tempObjTwo.getBoundingClientRect().height;
                      }
                  }
              }
              scope.getContainerTop = function(id){
                  if(document.getElementById(id)){
                      var tempObjTop = document.getElementById(id);
                      if(tempObjTop != null || tempObjTop != undefined ){
                          return tempObjTop.getBoundingClientRect().top;
                      }
                  }
              }
               
              scope.setTableHeight = function(id){
                  if(document.getElementById(id)){
                      var tempObjToTrack = document.getElementById(id);
                      if(tempObjToTrack != null || tempObjToTrack != undefined ){
                          return (((window.innerHeight - (scope.tableHeightBottomOffset)) - tempObjToTrack.getBoundingClientRect().top));
                      }
                  }
               }
            scope.workOutContainerHeight = function(id){
               
                         
                        if(document.getElementById(id) && document.getElementById(id).getElementsByClassName('fixed-container').length > 0 ){
                          //console.log(((document.getElementById(id).getBoundingClientRect().height - document.getElementById(id).getElementsByClassName('fixed-container')[0].getBoundingClientRect().height)  +  Math.abs(scope.scrollAmountTop) ))
                                return  ((document.getElementById(id).getBoundingClientRect().height - document.getElementById(id).getElementsByClassName('fixed-container')[0].getBoundingClientRect().height)  +  Math.abs(scope.scrollAmountTop) )+'px';
                             
                        }
                    
                
            }
               scope.toggleRow = function(){
                   for(row in scope.tableData){
                       var obbj = scope.tableData[row];
           
                               //console.log(obbj['elements'][0]['element']); 
                               scope.tableData[row]['elements'][0]['element'].toggle()
                             
                   }
                   scope.table.refresh();
                }
                scope.saveValue = function(value, id){
                    var sendValue = [];
                   

                        var tempO = document.getElementById(id)
                        
                        var request = {
                            value: value, 
                            instance:scope.tm1Instance, 
                            cube: scope.cubeName, 
                            cubeElements:(scope.focusedInputElementArray).split(',') 
                            }
                            sendValue.push(request);
                             
                            $tm1Ui.cellsetPut(sendValue).then(function(result){
                              //console.log(request, "######## saved")
                                 if(result.success){
                                  //console.log(result, "######## saved")
                                    
                                    scope.refreshNew(scope.dataset);
                        
                                 }else{
                    
                                 }
                            });
                 
                    
                     

                }
                scope.sendCellSetPutArray = [];
                
                scope.handlePaste = function($event) {
                   var clipboardData, pastedData;
                   var mainArrayObj = [];
                   // Stop data actually being pasted into div
                   $event.stopPropagation();
                   $event.preventDefault();
                   //console.log(scope.focusObj)
                   var startRow = (scope.focusObj+'').split('-')[2];
                   var columnRow = (scope.focusObj+'').split('-')[3];
                   // Get pasted data via clipboard API
                   
                   clipboardData = $event.clipboardData || window.clipboardData || $event.originalEvent.clipboardData;
                    if(clipboardData ){
                    pastedData = clipboardData.getData('Text');
                    newpasteDataArray = pastedData.split(String.fromCharCode(13));

                    // split rows into columns
                
                    
                    //var newpasteDataArray = (pastedData).split(/\r\n|\r|\n/g)
                    
                    // Do whatever with pasteddata
                    for (i=0; i<newpasteDataArray.length; i++) {
                        
                        newpasteDataArray[i] = (newpasteDataArray[i]).split(String.fromCharCode(9));
                         
                    }
                     
                    for (pp=0; pp<newpasteDataArray.length; pp++) {
                        
                       var aray = newpasteDataArray[pp]
                       
                        for (cell=0; cell< aray.length; cell++) {

                             if(document.getElementById('input-'+scope.tableId+'-'+(parseInt(startRow)+parseInt(pp))+'-'+(parseInt(columnRow)+parseInt(cell)))){
                                var tempElement = document.getElementById('input-'+scope.tableId+'-'+(parseInt(startRow)+parseInt(pp))+'-'+(parseInt(columnRow)+parseInt(cell)))
                                //console.log((parseInt(startRow)+parseInt(item)), (parseInt(columnRow)+parseInt(cell)), aray[cell] )
                               // console.log(tempElement);
                                if(tempElement != undefined && tempElement != null){
                                    //console.log(tempElement.getAttribute("cellref") );
                                    var elementArrayToUse = tempElement.getAttribute("cellref")
                                    scope.addRequest(aray,cell,tempElement)
                                }else{
                                row = scope.nextAvailable(parseInt(startRow)+parseInt(pp), (parseInt(columnRow)+parseInt(cell)) )
                                if(row === 'none'){
                
                                }else{
                                        var tempElement = document.getElementById('input-'+scope.tableId+'-'+(row)+'-'+(parseInt(columnRow)+parseInt(cell)))
                                        if(tempElement != undefined && tempElement != null){
                                        scope.addRequest(aray,cell,tempElement)
                                        }
                                }
                                
                                }
                             }
                             
                             
                             
                        }
                         
                    }
            
                    $tm1Ui.cellsetPut(scope.sendCellSetPutArray).then(function(result){
                        // console.log(result, "######## saved")
                         if(result.success){
                             
                            
                            scope.refreshNew(scope.dataset);
                
                         }else{
            
                         }
                    });
                   }
                   
           
                    
           }
           scope.nextAvailable = function(row, col){
               var tempElementTwo = document.getElementById('input-'+scope.tableId+'-'+(row+1)+'-'+col )
               if(tempElementTwo === undefined && tempElementTwo === null){
                   tempElementThree = document.getElementById('input-'+scope.tableId+'-'+(row+2)+'-'+col )
                   if(tempElementThree === undefined && tempElementTwo === null){
                        return 'none'
                   }else{
                       return ((row)+2)
                   }
               }else{
                   return ((row)+1)
               }
           }
           scope.addRequest = function(aray,cell,tempElement){
               var request = {
                   value: aray[cell], 
                   instance:scope.tm1Instance, 
                   cube: scope.cubeName, 
                   cubeElements:(tempElement.getAttribute("cellref")+'').split(',') 
                   }
                   
                   scope.sendCellSetPutArray.push(request);
           }
            scope.refresh();
            scope.setUpFreezePane();
               
           scope.drillNames = [];
           
           scope.getCellDrill = function(cubeElements){
            scope.drillNames = [];
            $tm1Ui.cellGetDrillNames(scope.tm1Instance,scope.cubeName,cubeElements).then(function(data){
                scope.tableDrillSource = [];
                scope.tableDrillCol = [];
                scope.datasetDrill= [];
                scope.tableDrill = [];
                 scope.drillNames = data;
               //console.log(data, "Transactional data")
                 $("#refModal"+scope.tableId).modal({show: true});
            });
           }
           scope.getDrillTable = function(cubeElements, name){
               scope.drillNameChosen = name;
                $tm1Ui.cellGetDrillNameTransactions(scope.tm1Instance,scope.cubeName, cubeElements, name).then(function(data){
                    if(data){
                        if(name === "Transactions"){
                            scope.datasetDrill = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, data);
                           
                            var options = {preload: false, watch: false};
                            if(scope.tableDrill){
                                
                              //  options.pageSize = scope.tableDrill.options.pageSize;
                                    
                            }
                            scope.tableDrill = $tm1Ui.tableCreate(scope, scope.datasetDrill.rows, options);
                        
                            scope.tableDrill.pageSize(1000)
                        }else{
                            scope.tableDrillSource = [];
                            scope.tableDrillCol = [];
                           // scope.tableDrill = data.value;
                           _.forEach(data.value[0], function(colvalue, colkey) {
                            scope.tableDrillCol.push(colkey);
                            //console.log(rowkey, rowvalue);
                             
                            });
                            _.forEach(data.value, function(value, key) {
                                scope.tableDrillSource[key] = [];
                                scope.tableDrillSource[key] = value;
                                 
                            });
                        }
                      //console.log(data, "Transactional data")
                        //scope.datasetDrill = $tm1Ui.resultsetTransform(scope.tm1Instance, scope.cubeName, data);
                        //var optionsDrill = {preload: false, watch: false};
                        //if(scope.tableDrill){
                         //   optionsDrill.index = scope.tableDrill.options.index;
                          //  optionsDrill.pageSize = scope.tableDrill.options.pageSize;
                                
                        //}
                        //scope.tableDrill = $tm1Ui.tableCreate(scope, scope.datasetDrill.rows, optionsDrill);
                    
                       // scope.tableDrill.pageSize(1000)
                    }  
                
                });
           }
          
           
                 
                scope.goToNewPage = function(url){
                    location.assign(url)
                }
                scope.rowsToDisplay = function(){
                    var count = 0;
                    for(row in scope.table.data()){
                        if(scope.selections.searchRows && ((scope.table.data()[row].elements[0].element.attributes['Description']).toLowerCase()).indexOf((scope.selections.searchRows).toLowerCase()) > -1){
                          //console.log("rows to display");
                            count++;
                        }else{
                            
                        }
                    }
                    return count;
                }
                scope.dispatchResize = function(){
                    
                            window.dispatchEvent(new Event('resize'));
                       
                    
                }

                $(window).resize(function() { 

                            scope.innerHeight = window.innerHeight;
                            scope.innerWidth =  window.innerWidth;
                    
                });
                
 

                scope.$watch(function () {
                    return $attributes.tableWidth;
                    
                    }, function (newValue, oldValue) { 
                        if(newValue != oldValue && oldValue != 'undefined' && oldValue != null){
                          //console.log(newValue, "Year changes inside directive");

                        }
                       
                                
                    })
 
                }


                
            };
        }]);
        
   
})();