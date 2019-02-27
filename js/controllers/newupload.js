app.controller('adminpresentationmanagementCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui','$timeout', function($scope, $rootScope, $log, $tm1Ui, $timeout) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
      
     $rootScope.pageTitle = 'Presentation Management';
    $scope.config = {itemsDisplayedInList:[]};
   /*   
                panel,description */
                $scope.columnArrayLetter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    $scope.defaults = {
        cube: "Conference Presentation",     
        panelClass: "panel-default",
        panelTitle:'Click on the upload button to upload a file',
        messageUpload:'false'
    };

    $scope.selections = { 
        panelClass: $scope.defaults.panelClass,
        panelTitle: $scope.defaults.panelTitle,
        messageUpload: $scope.defaults.messageUpload
    };

    $scope.functions = {};

    $scope.lists = {
        records: [],
        columns: [
            {key:"email", description:"Email"},
            {key:"name", description:"Name"},
            {key:"password", description:"Pasword"},
            {key:"group", description:"Group"}
            
        ],
        cellPutRequests: []
    };
    $scope.values = {
        favourites: "",
        errorCount: 0,
        warningCount: 0,
        projectUploaded: 0,
        valuesSentToTM1: false,
        panelMessageClick: 'Click save button to upload into Conference Presentation TM1 Cube - ',
        panelMessageUploaded: 'Values uploaded into TM1'
    };

    $scope.copyProductSuccess = function(){
        $scope.isProductCopied = true;
        $timeout(function(){
             $scope.isProductCopied = false;
        }, 2000);
    };

    // Trigger the Excel file read
    $scope.read = function (workbook) {
         $tm1Ui.dimensions($rootScope.instanceToUse).then(function(result){
             if(result.length){
                 for(var vv = 0; vv < result.length;vv++){
                    $scope.cubeDimensionArrayForValidation.push(result[vv].Name);
                 }
                 
        $scope.selections.panelTitle= $scope.values.panelMessageClick;
        $scope.selections.panelClass='panel-primary';
        // Parse the Excel file
        
        $scope.values.error = "";
        $scope.values.workbook = workbook;
        $scope.values.sheetName = "upload";
        $scope.lists.records = [];
        $scope.lists.cellPutRequests = [];
        //console.log("START READING EXCEL FILE" ,$scope.values.workbook.Sheets);
        // start with clean array every time function runs
        $scope.columnsLoaded = []; 
        $scope.lists.records = [];  
        // populate json object with data:array of cell data object created {row:rowNum, selected:true, data:row, error: '', warning: ''}
         
        $scope.workSheetToUse = $scope.to_json(workbook);
        //var json_object = JSON.stringify($scope.workSheetToUse);
        console.log($scope.workSheetToUse);
        
        if($scope.values.workbook.Sheets[$scope.workSheetName] == undefined){ 
            alert("NO sheet found in the workbook please please fix the file and reupload.");           
         
        }else{
            $scope.headerValidationError = false;
             $scope.parseWorksheet($scope.values.workbook.Sheets[$scope.workSheetName]);
                     
        }
             }
             });
        
  
    };
    $scope.alphaToNum = function(alpha) {

        var i = 0,
            num = 0,
            len = alpha.length;

        for (; i < len; i++) {
            num = num * 26 + alpha.charCodeAt(i) - 0x40;
        }

        return num - 1;
    }

    $scope.numToAlpha = function(num) {

        var alpha = '';

        for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
            alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
        }

        return alpha;
    }
     $scope.buildColumnsArray = function(range) {

        var i,
            res = [],
            rangeNum = range.split(':').map(function(val) {
                return $scope.alphaToNum(val.replace(/[0-9]/g, ''));
            }),
            start = rangeNum[0],
            end = rangeNum[1] + 1;

        for (i = start; i < end ; i++) {
            res.push($scope.numToAlpha(i));
        }

        return res;
    }
     $scope.parseWorksheet = function(sht){
        
        $scope.values.errorCount = 0;
        $scope.values.warningCount = 0 ;
        $scope.lists.records.length = 0;
        
        $scope.startDataRow = 5;
        $scope.startHeaderRow = 4;
        $scope.values.errorCount = 0;
        $scope.values.warningCount = 0 ;
        $scope.lists.records.length = 0;
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sht["!ref"]);
        console.log("range", range);

     
           
            for(var r = 0; r <= range.e.r; r++){
          //  row = [];


                     //var headerCell = sht[$scope.columnArrayLetter[col] +(r + 1)];
                  
                //
                if(r >= $scope.startHeaderRow && r < $scope.startDataRow){
                       // console.log(" ROW",r );
                     for(var hhg = 0; hhg <= range.e.c; hhg++){
                         var headerCell = sht[($scope.columnArrayLetter[hhg]+"") + (r + 1)];
                           // console.log("HEADER DATA ", headerCell, r);
                           if(headerCell == undefined){
                            alert("No header info found in document ");
                           }else{
                             $scope.columnsLoaded[hhg] = headerCell.v;
                           }
                            

                     }
                }else{
                    if(r >= $scope.startDataRow ){
                         var record = {row: r - $scope.startDataRow + 1,selected:false,error:'',warning:'', validationResultArray:[]};
                         
                        

                        for(var jjhh = 0; jjhh <= range.e.c; jjhh++){
                            var cellData = sht[($scope.columnArrayLetter[jjhh]+"") + (r + 1)];
                             if(cellData){
                                 record[$scope.columnsLoaded[jjhh]] = cellData.v;
                             }else{
                                 record[$scope.columnsLoaded[jjhh]] = '';
                                 
                             }
                            
                             
                        }
                         
                         $scope.lists.records.push(record);
                    }
                }
            
                
             
        }

      //  console.log("ROW RECORD ",$scope.lists.records);
        $scope.lists.validation = [];
        for(var jjj = 0; jjj < $scope.lists.records.length; jjj++){
            $scope.lists.validation.push($scope.lists.records[jjj]);
        }
          
        $scope.validate();
        $scope.countPresentationsToBeUploaded();
        $timeout(
            function(){
                //timeout required to force page recalculation
            $(window).trigger('resize');
        
            }
        )
    }

       

    $scope.workSheetName = '';
    $scope.to_json = function(workbook) {
        var result = {};
        var added = 0;
        workbook.SheetNames.forEach(function(sheetName) {
        
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
                $scope.workSheetName = sheetName;
              //  console.log(sheetName);
                result[added] = roa;
            }
            added++;
        });
        return result;
    }
        
    // Read the Excel file and populate the records array
     $scope.validateColumnArray = [0,1,2,3,4];
     $scope.cubeDimensionArrayForValidation = [];

    $scope.validate = function() {
        // Function gets the first record and then validates its contents
         
         
        if ($scope.lists.validation.length > 0){
            
            var record = $scope.lists.validation.shift();
           // console.log("VALIDATE", $scope.lists.validation, record);
            for(ddff = 0; ddff < $scope.columnsLoaded.length; ddff++ ){
               
                           
                               
                                  
                                
                                   
                                    if( ($scope.validateColumnArray).indexOf(ddff) > -1 && ($scope.cubeDimensionArrayForValidation).indexOf($scope.columnsLoaded[ddff]) > -1  ){
                                       
                                        if(  $scope.columnsLoaded[ddff] == ''  ||  record[$scope.columnsLoaded[ddff]] == '' ){
                                             record.error +=  "No "+ $scope.columnsLoaded[ddff] +"data in validation column. ";
                                             record.validationResultArray.push('false');
                                                        record.selected = false;
                                                        $scope.values.errorCount = $scope.values.errorCount + 1 ; 
                                              
                                        }else{
                                               $tm1Ui.dimensionElement($rootScope.instanceToUse, $scope.columnsLoaded[ddff], record[$scope.columnsLoaded[ddff]] ).then(function(value){
                                                if (value == undefined){
                                                    record.error += record[$scope.columnsLoaded[ddff]] + " does NOT exists in "+ $scope.columnsLoaded[ddff] +" dimension. ";
                                                    record.selected = false;
                                                    $scope.values.errorCount = $scope.values.errorCount + 1 ;
                                                    record.validationResultArray.push('false');
                                                }else{ 
                                                    record.validationResultArray.push('true');
                                                    record.selected = true;
                                                    
                                                    
                                                }
                                            });
                                            
                                        }
                                    }else{
                                       if(($scope.validateColumnArray).indexOf(ddff) > -1 ){
                                           $scope.headerValidationError = true;
                                            record.error =  ""+$scope.columnsLoaded[ddff]+" element is not part of Dimensions. Check the spelling ";
                                            record.validationResultArray.push('false');
                                                        record.selected = false;
                                                        $scope.values.errorCount = $scope.values.errorCount + 1 ; 
                                       }  
                                              
                                    }
                         
                           
                    
                        
                        
                
                    
                    // Loop Through all the Months and check if value == 0
                    
                 
            }
                 if($scope.lists.validation.length === 0){
                         
                    }else{
                        $scope.validate();
                    } 
        }else{
             
        } 
         
    };

    // Refresh Group 1 DBR
    $scope.functions.refreshGroup = function(groupName){
        $tm1Ui.dataRefresh(groupName);
    };

    $scope.getMonthName = function(month){
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[month-1];
    };

    $scope.countPresentationsToBeUploaded = function (){
         
        $scope.values.presentationsToBeUploaded = 0;
        for(var i = 0; i < $scope.lists.records.length; i++){
            var record = $scope.lists.records[i];
            if(record.selected){
                $scope.values.presentationsToBeUploaded += 1;
            }
        }
    }

    // SAVE ITEM ONE BY ONE
    $scope.saveAll = function(){
        if($scope.values.sheetName){
            $scope.selections.messageUpload='true';
            $scope.selections.panelClass='panel-info';
            $scope.count = $scope.lists.records.length;
            // CREATE THE REQUESTS
            // LOOP THROUGH THE RECORDS
            //debugger;
            
 
             for(var i = 0; i < $scope.lists.records.length; i++){
                var record = $scope.lists.records[i];
                
                if (record.selected){
                    
                      // console.log(record, "recordm")
                    // LOOP THROUGH THE MONTHS //
                    for(var col = 1; col < $scope.columnsLoaded.length; col++){
                       
                            
                        
                            var newValue =  record[$scope.columnsLoaded[col]];
                            if(  newValue && newValue != null && newValue != '-' ){
                               // console.log("VALUE IS - ", m, i);
                            }else{
                                newValue = '';
                            } 
                                    var request = {
                                        value:  newValue, 
                                        instance:$rootScope.instanceToUse, 
                                        cube: $scope.defaults.cube, 
                                        cubeElements:[
                                            $scope.page.titles['Conference'], record[$scope.columnsLoaded[0]], $scope.columnsLoaded[col]
                                            ]
                                        }
                                     console.log(request);
                                    $scope.lists.cellPutRequests.push(request);
                                        
                                    
                            
                            
                        
                        
                    } 
                } 
             }
              //  console.log( $scope.lists.cellPutRequests);
                
            };
            $scope.loading= false;
            console.log( $scope.lists.cellPutRequests);
             $tm1Ui.cellSetPut($scope.lists.cellPutRequests).then(function(result){
                     if(result && !result.failed){
                     $scope.values.valuesSentToTM1 = true;
                     $scope.functions.refreshGroup('Group 1');
                     $scope.selections.panelClass='panel-success';
                     $scope.selections.panelTitle=$scope.values.panelMessageUploaded;
                     $("#modalSave").modal('hide');
                                
                              
                                 $timeout(function() { 
                                      $scope.values.valuesSentToTM1 = false;
                                              $scope.selections.panelClass='panel-default';
                                               $scope.selections.panelTitle=$scope.values.panelMessageClick;
                                    
                                     $scope.loading= true;
                                     $timeout(
                                         function(){
                                            
                                            
                                             
                                             $scope.loading= false;
                                             $scope.lists.records = [];
                                              
                                           
                                         }, 1000
                                     ) 
                                 }, 1000 );
                     }
                 });
        }
   
   
        
    $scope.viewData = function(data){
        console.log(data['Presentation'].name, "$$$$$$$$$$$$$$$$")
    }

    $scope.onAfterRun = function(state){
        console.log("TI HAS RUN", state);
        $('#modalAgenda').modal();
    }
    $scope.getHeight= function() {
    var top = document.getElementById("tablescroll").getBoundingClientRect().top;
    $scope.rowHeightArray = [];
            if(document.getElementsByClassName('row-height-ind').length){
            // console.log("row found" );
                for(var nb = 0; nb < document.getElementsByClassName('row-height-ind').length; nb++){
                    var tmp = document.getElementsByClassName('row-height-ind')[nb];
                    $scope.rowHeightArray.push(tmp.getBoundingClientRect().height); 
                }
            }
            
    return ((window.innerHeight) - (top)-60);

    }
    
  
    fixedTable = function(el) {
		var $body, $header, $sidebar;
		$body = $(el).find('.fixedTable-body');
		$sidebar = $(el).find('.fixedTable-sidebar table');
        $header = $(el).find('.fixedTable-header table');
        $dropDownElements = document.getElementsByClassName('tm1-select-plain-style'); 
		return $($body).scroll(function() {
            for(var ff = 0; ff < $dropDownElements.length; ff++){
                var tempDropDown =  $dropDownElements[ff];
               // console.log(tempDropDown, tempDropDown.style.cssText);
                var styleFormat = (tempDropDown.style.cssText+"").split("width:")[1];
                var styleWidth = (tempDropDown.style.cssText+"").split(";")[0];
                tempDropDown.setAttribute("class", "tm1-select-plain-style ng-hide");
                tempDropDown.setAttribute("style" , "width:"+styleWidth+"; position:absolute; z-index:5; margin-top:-"+$($body).scrollTop()+"px; margin-left:-"+$($body).scrollLeft()+"px;" );
            }
            $($sidebar).css('margin-top', -$($body).scrollTop()); 
			return $($header).css('margin-left', -$($body).scrollLeft());
		});
	};
    $scope.startTable = function(){
       var tablescroll = new fixedTable($('#tablescroll'));

    }
    $scope.startResize = function(){
    
    $timeout(
        function(){  $(window).trigger('resize');
        }, 1000)
    }
 
	$(window).resize(function() {
      $scope.$apply(function() {
           var top = document.getElementById("tablescroll").getBoundingClientRect().top;
        $scope.rowHeightArray = [];
        if(document.getElementsByClassName('row-height-ind').length){
          //  console.log("row found" );
            for(var cc = 0; cc < document.getElementsByClassName('row-height-ind').length; cc++){
                var tmp = document.getElementsByClassName('row-height-ind')[cc];
                $scope.rowHeightArray.push(tmp.getBoundingClientRect().height); 
            }
        }
        
        
               
              $("fixedTable-body").css("height",((window.innerHeight) - (top)-60)+"px");
       $("#af1").css("height",((window.innerHeight) - (top)-60)+"px");
      //  console.log($( window ).width(), $scope.config.itemsDisplayedInList, "RESIZE       ######");
      });
    });

 
    
}]);
