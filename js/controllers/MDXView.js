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
     $scope.getMathMax = function(arr){
         if(arr){
            var max = arr.reduce(function(a, b) {
                return Math.max(a, b);
            });
            return 'tm1-ui-element-consol tm1-ui-element-consol-'+(max+'') ;
         }else{
             return 'tm1-ui-element-consol tm1-ui-element-consol-'+(0+'');
         }
        
        
     }
    $rootScope.refreshNew = function(newdataset){
         
        $timeout(

            function(){
                $tm1Ui.cubeExecuteView("dev","General Ledger", "Budget Template").then(function(result){
                    if(!result.failed){
                        $scope.datasetNew =    $tm1Ui.resultsetTransform("dev", "General Ledger", result, {alias: {Account: "Description", Period: "Short Description", Department: "Description", Version: "Description"}});
                           
                        $scope.dataset = newdataset;
                            var options = {preload: false, watch: false};
                             
                            $scope.tableNew = $tm1Ui.tableCreate($scope, $scope.datasetNew.rows, options);
                            $scope.tableNew.pageSize(1000)
                           // console.log($scope.table.data(), $scope.tableNew.data());  
                            var tableRows = $scope.table.data();
                            for(newrow in $scope.tableNew.data()){
                                for(row in $scope.table.data()){
                                    if($scope.tableNew.data()[newrow].index === $scope.table.data()[row].index){
                                       // console.log($scope.tableNew.data()[newrow].cells, "same row");
                                        $scope.table.data()[row].cells = $scope.tableNew.data()[newrow].cells;
                                    }
                                
                                }
                            }
                            $scope.getLastFocus();
                            //$scope.table = $scope.tableNew
                             
                                
                         
                        
                         
                        
                         
                        
                         
                    } else {
                        $scope.message = result.message;
                      
                    }		
                   
                })
            },500
        )
    }

    $scope.getFocus = function($event) {           
        $scope.focusObj = $event.target.id;
        document.getElementById($event.target.id).addEventListener('paste', $scope.handlePaste);
        console.log("add paste event listener",$event.target.id)
    }
    $scope.getLastFocus = function() {  
         if(document.getElementById($scope.focusObj)){
            document.getElementById($scope.focusObj).focus(); 
         }
             
            
        
    }
    $scope.lostFocus = function($event) {  
        var focusObjOut = $event.target.id;
        $scope.focusObj = '';
       // console.log("remove eventListener")
        document.getElementById(focusObjOut).removeEventListener('paste', $scope.handlePaste);

        
    
    }   
    $rootScope.cellreferneceArray = [];
    $rootScope.dimensionArray = [];
    $scope.openRefModel = function(elementString){
        $rootScope.cellreferneceArray = (elementString+'').split(',')
        $tm1Ui.cubeDimensions("dev","General Ledger").then(function(result){
            $rootScope.dimensionArray = result;
            $("#refModal").modal({show: true});  
        })
          
    }
        $scope.refresh = function(){
          
            $timeout(
                function(){
                    $tm1Ui.cubeExecuteView("dev","General Ledger", "Budget Template").then(function(result){
                        if(!result.failed){
                            
                            $scope.dataset = $tm1Ui.resultsetTransform("dev", "General Ledger", result, {alias: {Account: "Description", Period: "Short Description", Department: "Description", Version: "Description"}});
                            var options = {preload: false, watch: false};
                            if($scope.table){
                                options.index = $scope.table.options.index;
                                options.pageSize = $scope.table.options.pageSize;
                                 
                            }
                            $scope.table = $tm1Ui.tableCreate($scope, $scope.dataset.rows, options);
                            $scope.table.pageSize(1000)
                            $scope.loading = false;
                            console.log("loadded new from old rows")
                            $scope.table.refresh();
                            //$rootScope.tableData = $scope.table.data();
                             
                        } else {
                            $scope.message = result.message;
                            $scope.loading = false;
                        }		
                       
                    })
                },500
            )
             
         }
         $rootScope.tableData = [];
         $rootScope.tableRowCollapseData = [];
         $rootScope.collapsedRowArray = [];
         $scope.refresh();
         //localStorage.clear();
         $scope.seeNewData = function(data){
             //console.log(data)
         }
         $scope.getColType = function(data){
            return data;
        }
         $scope.seeData = function(rowindex,table){
           
           // console.log(rowindex, $scope.dataset.rows[rowindex])
            $scope.dataset.rows[(rowindex)]['Account']['element'].toggle();
            $scope.table.refresh();
            $rootScope.refreshNew($scope.dataset);

            // console.log($scope.dataset.rows[rowindex])
         };
     
     
        $scope.toggleRow = function(){
        for(row in $rootScope.tableData){
            var obbj = $rootScope.tableData[row];

           
                 
                    //console.log(obbj['elements'][0]['element']); 
                    $rootScope.tableData[row]['elements'][0]['element'].toggle()
                 
                
           
           
        }
         $scope.table.refresh();
     }
     $scope.sendCellSetPutArray = [];
     $scope.handlePaste = function(e) {
		var clipboardData, pastedData;
        var mainArrayObj = [];
		// Stop data actually being pasted into div
		e.stopPropagation();
        e.preventDefault();
        var startRow = ($scope.focusObj+'').split('-')[1];
        var columnRow = ($scope.focusObj+'').split('-')[2];
		// Get pasted data via clipboard API
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('Text');
        var newpasteDataArray = (pastedData).split(/\r\n|\r|\n/g)
        // Do whatever with pasteddata
        for(item in newpasteDataArray){
            var tempal = (newpasteDataArray[item]).split('	');

            mainArrayObj[item] = [tempal];
        }
        for(item in mainArrayObj){
           // console.log(parseInt(startRow), parseInt(columnRow) )
           var aray = (mainArrayObj[item]+'').split(',')
            for(cell in aray){
                 
                var tempElement = document.getElementById('input-'+(parseInt(startRow)+parseInt(item))+'-'+(parseInt(columnRow)+parseInt(cell)))
                //console.log((parseInt(startRow)+parseInt(item)), (parseInt(columnRow)+parseInt(cell)), aray[cell] )
                //console.log(tempElement.getAttribute("cellref") );
                if(tempElement != undefined && tempElement != null){
                    //console.log(tempElement.getAttribute("cellref") );
                    $scope.addRequest(aray,cell,tempElement)
                }else{
                   row = $scope.nextAvailable(parseInt(startRow)+parseInt(item), (parseInt(columnRow)+parseInt(cell)) )
                   if(row === 'none'){

                   }else{
                        var tempElement = document.getElementById('input-'+(row)+'-'+(parseInt(columnRow)+parseInt(cell)))
                        if(tempElement != undefined && tempElement != null){
                        $scope.addRequest(aray,cell,tempElement)
                        }
                   }
                  
                }
                 
                 
            }
             
        }

        $tm1Ui.cellsetPut($scope.sendCellSetPutArray).then(function(result){
            // console.log(result, "######## saved")
             if(result.success){
                 
                
                $rootScope.refreshNew($scope.dataset);
    
             }else{

             }
        });

         
}
$scope.nextAvailable = function(row, col){
    var tempElementTwo = document.getElementById('input-'+(row+1)+'-'+col )
    if(tempElementTwo === undefined && tempElementTwo === null){
        tempElementThree = document.getElementById('input-'+(row+2)+'-'+col )
        if(tempElementThree === undefined && tempElementTwo === null){
             return 'none'
        }else{
            return ((row)+2)
        }
    }else{
        return ((row)+1)
    }
}
$scope.addRequest = function(aray,cell,tempElement){
    var request = {
        value: aray[cell], 
        instance:"dev", 
        cube: "General Ledger", 
        cubeElements:(tempElement.getAttribute("cellref")+'').split(',') 
        }
        
        $scope.sendCellSetPutArray.push(request);
}
 
     
	
     

    
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