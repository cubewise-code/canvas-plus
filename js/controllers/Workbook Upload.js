app.controller('WorkbookUploadCtrl',   ['$scope', '$rootScope', '$log', '$tm1Ui', '$timeout', '$sce', '$ngBootbox',
function($scope, $rootScope, $log, $tm1Ui, $timeout, $sce, $ngBootbox) {
    
    $scope.defaults = {
        cube:"Retail",
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
        cellPutRequests: []
    };
    $scope.values = { 
        errorCount: [],
        warningCount: 0,
        projectUploaded: 0,
        headerErrorCount:[],
        valuesSentToTM1: false,
        panelMessageClick: 'Click save button to upload into TM1',
        panelMessageUploaded: 'Values uploaded into TM1'
    };
    $scope.lists = {rowDriver:{}, colDriver:{}};
    $scope.copyProductSuccess = function(){
        $scope.isProductCopied = true;
        $timeout(function(){
             $scope.isProductCopied = false;
        }, 2000);
    };
    $scope.workbookUploadedSheetsData = [];
    $scope.workbookUploadedSheetsColumnData = [];
    $scope.validationColumnArray = [0];
    $scope.headerLetterArray=[];
    $scope.sheetsUploaded = [];
    $scope.sheetsToShowIn = [];
    $rootScope.pageTitle = "Workbook Upload";
    //DEFAULT CUBE ELEMENT ARRAY TO SAVE DATA AGAINST IF COLUMNS OR ROW DIMENSIONS ARE FOUND THEY WILL BE OVER WRITEN BEFORE SAVING//
    $scope.defaultElementArray = [{Version:"Budget"},{Year:"2015"},{Period:"Year"},{Currency:"Local"},{Region:"Total Europe"},{Product:"All Products by Category"},{'Retail Measure':"Sales Amount"}]
    //SHEETS TO READ SETTINGS//
    $scope.defaults.sheets = ["upload","Sheet2"];
    //$scope.sheetsToLoad = ["upload","second sheet", "Sheet2"];
    //$scope.sheetsToReadIn =[[true],[true],[true]];
    // DIMENSION VALIDATION COLUMNS SETTINGS//
    $scope.colToValidate = [["Product", "Region"],[""], ["Product", "Region"]];
    $scope.colLetterToValidate = [["A", "B"],[""],["A", "B"]];
    $scope.attributesforValidationList = [["Code&Description", "Description"],[""],["Code&Description", "Description"]];
    $scope.subsetForValidationLists = [["AllElements","Default"],[""],["AllElements","Default"]];
    ///DATA COLUMNS SETTINGS 
    $scope.colDimensionName = [["Period"],["Period"],["Period"]];
    $scope.colDimensionSubset = [["Default"],["Default"],["Default"]] 
    $scope.colDimensionAttributes = [["Short Description"],["Short Description"],["Short Description"]];

    $scope.validationPassed = [];
    // Trigger the Excel file read
    $scope.read = function (workbook) {
        $scope.selections.panelTitle= $scope.values.panelMessageClick;
        $scope.selections.panelClass='panel-primary';
        // Parse the Excel file
        $scope.values.error = "";
        $scope.values.workbook = workbook;
        $scope.values.sheetName = "upload";
        $scope.lists.records = [];
        $scope.workbookUploadedSheetsData = [];
        $scope.workbookUploadedSheetsColumnData = [];
        $scope.cubeDimensionArrayForValidation = [];
        $scope.headerValidationError = [];
         $scope.headerValidationErrorPopover   = [];
         $scope.values.headerErrorCount = [];
          $scope.values.errorCount = [];
          $scope.values.warningCount = 0;
        //timeout required to force page recalculation
        
        $timeout(function(){
            $tm1Ui.dimensions('dev').then(function(result){
            if(result.length){
                for(var sd = 0; sd < result.length;sd++){
                    $scope.cubeDimensionArrayForValidation.push(result[sd].Name);
                }
             //   console.log($scope.cubeDimensionArrayForValidation)
            }
             
            //$scope.parseWorksheet($scope.values.workbook.Sheets[$scope.values.sheetName]);
            var sheet_name_list = workbook.SheetNames;
            var sheet_name_list_start = workbook.SheetNames;
            $scope.sheetsToLoad = [];
            $scope.sheetsToReadIn = [];

             sheet_name_list_start.forEach(function(y, index) {
               
                $scope.sheetsToReadIn[index] = []
                
                $scope.sheetsToLoad.push(workbook.SheetNames[index]);
                if(($scope.defaults.sheets).indexOf(y) > -1){
                      $scope.sheetsToReadIn[index].push(true);
                }else{
                      $scope.sheetsToReadIn[index].push(false);
                }
               
                console.log($scope.sheetsToLoad,$scope.sheetsToReadIn, index, "$$$$$$$$");
             
             });
            sheet_name_list.forEach(function(y, index) {
                
               // console.log(y,index, $scope.sheetsToReadIn[index][0], "SHEETS TO READ IN");
                $scope.sheetsUploaded.push(y);
                var worksheet = workbook.Sheets[y];
                $scope.headerValidationError[index]=false;
                 console.log(worksheet, y,"$scope.sheetNameToLoad");
                var headers = {};
                var data = [];
                var startRow = 4;
                 $scope.values.errorCount[index] = 0;
                 
                for(z in worksheet) {
                    
                    if(z[0] === '!'){
                        
                     }else{  
                         
                         
                        //parse out the column, row, and value
                        var col = z.substring(0,1);
                        var row = parseInt(z.substring(1));
                        var value = worksheet[z].v;

                        //store header names
                        if(row === startRow ) {
                            headers[col] = {};
                            if( ($scope.cubeDimensionArrayForValidation).indexOf(value) > -1){
                                console.log("Found Dimension in Column", value);
                            }


                            if( ($scope.colLetterToValidate[index]).indexOf(col) > -1 ){
                                var rowValidated = false;
                                for(fhf = 0; fhf < $scope.cubeDimensionArrayForValidation.length; fhf++){
                                    if($scope.cubeDimensionArrayForValidation[fhf] === value){
                                        rowValidated = true;
                                       // console.log("VALIDATED ", value,$scope.headerValidationError[index], index, z);

                                    }else{
                                        
                                    }

                                }
                                if(!rowValidated){
                                    $scope.headerValidationError[index]= true;
                                     
                                    $scope.values.headerErrorCount[index] = $scope.values.headerErrorCount[index] + 1 ;
                                    if(!$scope.headerValidationErrorPopover[index]){
                                        $scope.headerValidationErrorPopover[index] = $sce.trustAsHtml("<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+value+"</b> is not a Dimension Name. Check the spelling. </p>");
                                    }else{
                                        $scope.headerValidationErrorPopover[index] += $sce.trustAsHtml("<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+value+"</b> is not a Dimension Name. Check the spelling. </p>");
                                    }
                                     
                                   // console.log("HEDER NOT VALIDATED ",  value, $scope.headerValidationError[index], index, z);
                                
                                }
                            }else{
                                var colValidated = false;
                                   //console.log($scope.lists.colDriver[index], "$scope.lists.colDriver"); 
                                for(coldriver in $scope.lists.colDriver[index]){
                                     
                                    if($scope.lists.colDriver[index][coldriver].alias === value){
                                        colValidated = true;                                    
                                    }         
                                    
                                }
                                if(!colValidated){
                                      $scope.headerValidationError[index]= true;
                                     
                                      $scope.values.headerErrorCount[index] = $scope.values.headerErrorCount[index] + 1 ;
                                     if(!$scope.headerValidationErrorPopover[index]){
                                          $scope.headerValidationErrorPopover[index] = $sce.trustAsHtml("<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+value+"</b> is not a Element of "+$scope.colDimensionName[index]+" Dimension. Check the spelling. </p>");
                                     }else{
                                          $scope.headerValidationErrorPopover[index] += $sce.trustAsHtml("<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+value+"</b> is not a Element of "+$scope.colDimensionName[index]+" Dimension. Check the spelling. </p>");
                                     }
                                     
                                    //console.log("HEDER NOT VALIDATED ",  value, index);
                                
                                }
                            }
                            headers[col] = value;
                            
                            continue;
                           
                        } 
                            if(row > startRow) {
                               // console.log((row-(startRow-1)) , row, value);
                                if(!data[(row-(startRow-1))])
                                    data[(row-(startRow-1))]={};
                                // console.log("ROW CREATION ",  value,  (row-(startRow-1)), headers[col]);
                                    data[(row-(startRow-1))][headers[col]] = value;
                                    data[(row-(startRow-1))]['selectedArray'] = []; 
                                    data[(row-(startRow-1))]['selected'] = true; 
                                    data[(row-(startRow-1))]['number'] = ((row-(startRow-1)));
                            }
                         
                         
                         
                      
                     }
                         
                }
                //drop those first two rows which are empty
                data.shift();
                data.shift();
                $scope.workbookUploadedSheetsData.push(data);
              //  console.log(headers);
                $scope.workbookUploadedSheetsColumnData.push(headers);
               
                //var rangeObj = {};
               // rangeObj = {"e": {"c": headers.length, "r": data.length}, "s": {"c": 0, "r": startRow}};
                // 
               // console.log(rangeObj,  $scope.buildColumnsArray(rangeObj), "$scope.headerLetterArray");
            });
            
            $scope.lists.finalValidation =[];
            for(var ty = 0; ty < $scope.workbookUploadedSheetsData.length; ty++){
                    
                    $scope.lists.finalValidation[ty] = [];
                    var validation = [];
                    for(k in $scope.workbookUploadedSheetsData[ty]) {
                        //console.log($scope.workbookUploadedSheetsData[i][k], "$scope.workbookUploadedSheetsData[i][k]");
                        validation.push($scope.workbookUploadedSheetsData[ty][k]);
                    }
                    $scope.lists.finalValidation[ty] = validation;
                    //    console.log($scope.workbookUploadedSheetsColumnData,  $scope.workbookUploadedSheetsData.length, $scope.lists.finalValidation.length);
            
            }
            
           $scope.validate();
           $timeout(
               function(){
                   $scope.countItemsToBeUploaded();
               }
           )
            
        });
        });
    };

    // Read the Excel file and populate the records array
   
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
            rangeNum = (range+"").split(':').map(function(val) {
                return $scope.alphaToNum(val.replace(/[0-9]/g, ''));
            }),
            start = rangeNum[0],
            end = rangeNum[1] + 1;

        for (i = start; i < end ; i++) {
            res.push($scope.numToAlpha(i));
        }

        return res;
    }
    $scope.validate = function() {
        
        var validation_list = $scope.lists.finalValidation;
          
        _.forEach(validation_list, function(list, index) {
              //  console.log( index,"SHEET ");
            // Function gets the first record and then validates its contents
            if (list.length > 0){
                //shift() remove a record once it has been investigated
                var record = list.shift();
                var count = 0;
                 
                                     _.forEach(record, function (item, recordindex) {
                                        // Check for duplicate record
                                         _.forEach( list[index], function (llist, recordindexx) {
                                                 if(recordindexx === $scope.colToValidate[index][0] && $scope.sheetsToReadIn[index]){
                                                  if(llist === item){
                                                      count++;
                                                   //   console.log("same ", llist, item );
                                                      
                                                  }
                                                 //   $scope.duplicateElementArray[index].push(llist);

                                                 } 
                                               
                                        }); 
                                        if(recordindex === $scope.colToValidate[index][0] && $scope.sheetsToReadIn[index]){
                                        // IF DUPLICATE FOUND ie count > 0
                                            if(count > 0){
                                                record.selected = false;
                                                record.selectedArray.push('false')
                                                $scope.values.errorCount[index] = $scope.values.errorCount[index] + 1 ;
                                                record.error = "<b>"+item + "</b> duplicate record found.";
                                            }

                                        }

                                              
                                        if(($scope.colToValidate[index]).indexOf(recordindex) > -1 && item != '' | item != '-' ){
                                           var tempArray = [];
                                            tempArray[recordindex] = [];
                                            

                                            //console.log( $scope.lists.rowDriver[index],  "DRIVER");
                                            for(driver in $scope.lists.rowDriver[recordindex]){
                                                  
                                               tempArray[recordindex].push($scope.lists.rowDriver[recordindex][driver].alias)
                                            }
 
                                            if((tempArray[recordindex]).indexOf(item) > -1){
                                                 record.selectedArray.push('true');
                                                 record.selected = true;
                                                
                                                // console.log((tempArray).indexOf(item),  item,  " name has been validated");

                                            }else{
                                                
                                                 if(!record.error){
                                                     
                                                     record.error = "<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+item+"</b> does not exist in "+recordindex+" Dimension as Element. <p>";
                                                 }else{
                                                      
                                                     record.error += "<p style='padding-bottom:5px; border-bottom:1px solid #333;'><b>"+item+"</b> does not exist in "+recordindex+" Dimension as Element. <p>";
                                                 }
                                                  
                                                    record.selected = false;
                                                    record.selectedArray.push('false');
                                                    $scope.values.errorCount[index] = $scope.values.errorCount[index]  + 1 ;
                                                    
                                            }
 
                                        }else{
                                            
                                        }
                                         
                                      
                                     }); 
                $scope.validate();
                  
            }else{
                 
            }
        });
    };
     
   

     

    // Refresh Group 1 DBR
    $scope.functions.refreshGroup = function(groupName){
        $tm1Ui.dataRefresh(groupName);
    };

      
    $scope.countItemsToBeUploaded = function (){
        $scope.values.itemsToBeUploaded = [];

         for(var uue = 0; uue < $scope.workbookUploadedSheetsData.length; uue++){ 
             $scope.values.itemsToBeUploaded[uue] = 0;
            for(llp in $scope.workbookUploadedSheetsData[uue]) {
                var record = $scope.workbookUploadedSheetsData[uue][llp];
                if(record.selected){
                     
                    $scope.values.itemsToBeUploaded[uue] += 1;
                    //console.log("count selected", $scope.values.itemsToBeUploaded[uue] ,record.selected);
                }
                //validation.push($scope.workbookUploadedSheetsData[uue][llp]);
            }         
        }
    }

    // SAVE ITEM ONE BY ONE
    $scope.saveAll = function(){
        
    $tm1Ui.cubeDimensions('dev', $scope.defaults.cube).then(function(result){
        if(result.length){
                var elementsArrayToSend = {};
                
            for(var svv = 0; svv < result.length; svv++){
                 //   console.log("result", result[svv], $scope.defaultElementArray[svv][result[svv]]);
                    elementsArrayToSend[result[svv]] = ($scope.defaultElementArray[svv][result[svv]]);
            }
                 
               
               
            for(var sheetloading = 0; sheetloading < $scope.workbookUploadedSheetsData.length; sheetloading++){ 

                $scope.lists.cellPutRequests = [];
                $scope.lists.cellPutRequests[sheetloading] = [];
                if( $scope.sheetsToReadIn[sheetloading][0]){ 

                    for(rowrecord in $scope.workbookUploadedSheetsData[sheetloading]) {
                    
                            var record = $scope.workbookUploadedSheetsData[sheetloading][rowrecord];
                        if(record.selected){
                            
                            
                            //console.log("ITEM SAVING SELECTED",record ,record.selected, $scope.sheetsToReadIn[sheetloading]);
                            _.forEach( $scope.workbookUploadedSheetsColumnData[sheetloading], function (item, columnName) {
                                //console.log(item, record[item])
                                var cellValue = record[item];
                                if(cellValue === undefined || cellValue === '-' || cellValue === ''){
                                    cellValue = '';
                                }else{

                                }
                                
                                if( ($scope.colToValidate[sheetloading]).indexOf(item) > -1  ){
                                        
                                    elementsArrayToSend[item] = cellValue;
                                    //console.log( elementsArrayToSend, item, columnName, cellValue, "REC ") 
                                }
                                elementsArrayToSend[$scope.colDimensionName[sheetloading][0]]  = item;
                                    
                                //console.log( elementsArrayToSend, "REC ");
                                    
                                    
                            var finalElementArrayToSend = [];
                            _.forEach( elementsArrayToSend, function (el, value) {
                                
                                finalElementArrayToSend.push(el)
                            });
                             
                            if( ($scope.colToValidate[sheetloading]).indexOf(item) > -1  ){
                                    
                            }else{
                                      var request = {
                                        value: cellValue, 
                                        instance:"dev", 
                                        cube: $scope.defaults.cube, 
                                        cubeElements:finalElementArrayToSend 
                                        }
                                        
                                        $scope.lists.cellPutRequests[sheetloading].push(request);
                                    }
                                  
                                
                                });
                            }
                        //validation.push($scope.workbookUploadedSheetsData[uue][llp]);
                        } 
                        console.log($scope.lists.cellPutRequests[sheetloading]);
                        $tm1Ui.cellsetPut($scope.lists.cellPutRequests[sheetloading]).then(function(result){
                           // console.log(result, "######## saved")
                            if(result.success){
                                if(!$scope.alertOpen){
                                    $scope.alertOpen = true;
                                    $ngBootbox.alert('Data Saved to TM1 '+$scope.defaults.cube+' Cube, Success!')
                                    .then(function() {
                                       $scope.alertOpen = false;
                                    });
                                }
                                 
    
                            }else{
                              
                                    $scope.alertOpen = true;
                                    $ngBootbox.alert('Failed! One or more record that was saved had issue please apply correct validation parameters .')
                                    .then(function() {
                                       $scope.alertOpen = false;
                                    });
                              
                                
                            }
                        });     
                    }    
                }
            }
         });
         
    
         
     };
    // END OF THE CONTROLLER
}]);