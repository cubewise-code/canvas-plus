app.controller('ExcelUploadCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$timeout', function($scope, $rootScope, $log, $tm1Ui, $timeout) {
    $rootScope.pageTitle = "Excel Upload";
    $scope.defaults = {
        cube: "Retail",
        version: "Budget",
        year: $rootScope.defaults.year,
        currency: "Local",
        measure: "Sales Amount",
        region: $rootScope.defaults.region,
        panelClass: "panel-default",
        panelTitle:'Click on the upload button to upload a file',
        messageUpload:'false'
    };

    $scope.selections = {
        version: $scope.defaults.version,
        year: $scope.defaults.year,
        currency: $scope.defaults.currency,
        measure: $scope.defaults.measure,
        region: $scope.defaults.region,
        panelClass: $scope.defaults.panelClass,
        panelTitle: $scope.defaults.panelTitle,
        messageUpload: $scope.defaults.messageUpload
    };

    $scope.functions = {};

    $scope.lists = {
        records: [],
        tm1ProductList:[],
        months: [
            {key:"01", description:"Jan"},
            {key:"02", description:"Feb"},
            {key:"03", description:"Mar"},
            {key:"04", description:"Apr"},
            {key:"05", description:"May"},
            {key:"06", description:"Jun"},
            {key:"07", description:"Jul"},
            {key:"08", description:"Aug"},
            {key:"09", description:"Sep"},
            {key:"10", description:"Oct"},
            {key:"11", description:"Nov"},
            {key:"12", description:"Dec"},
        ],
        cellPutRequests: []
    };
    $scope.values = {
        favourites: "",
        errorCount: 0,
        warningCount: 0,
        projectUploaded: 0,
        valuesSentToTM1: false,
        panelMessageClick: 'Click save button to upload into TM1',
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
         
        $scope.selections.panelTitle= $scope.values.panelMessageClick;
        $scope.selections.panelClass='panel-primary';
        // Parse the Excel file
        $scope.values.error = "";
        $scope.values.workbook = workbook;
        $scope.values.sheetName = "upload";
        $scope.lists.records = [];
        //timeout required to force page recalculation
        $timeout(function(){
            $scope.parseWorksheet($scope.values.workbook.Sheets[$scope.values.sheetName]);
        });
    };

    // Read the Excel file and populate the records array
    $scope.parseWorksheet = function(sht){
         $scope.lists.productListCaptured = [];
            for(item in $scope.lists.tm1ProductList){
                     
                 $scope.lists.productListCaptured.push($scope.lists.tm1ProductList[item]['Code&Description']);
                 
             }
        $scope.values.errorCount = 0;
        $scope.values.warningCount = 0 ;
        $scope.lists.records.length = 0;
        $scope.selections.year = sht["B4"].v;
        $scope.selections.region = sht["B5"].v;
        var startRow = 8;
        var range = XLSX.utils.decode_range(sht["!ref"]);
        for(var r = startRow; r <= range.e.r; r++){
 
            // Test if the first cell and check if it is empty
            var productCell = sht["A" +(r + 1)];
            if (productCell === undefined) {
                // No more data
                break;
            }

            var product = sht["A" +(r + 1)].v;
            var year = sht["B" +(r + 1)].v;
            var m01 = sht["C" +(r + 1)].v;
            var m02 = sht["D" +(r + 1)].v;
            var m03 = sht["E" +(r + 1)].v;
            var m04 = sht["F" +(r + 1)].v;
            var m05 = sht["G" +(r + 1)].v;
            var m06 = sht["H" +(r + 1)].v;
            var m07 = sht["I" +(r + 1)].v;
            var m08 = sht["J" +(r + 1)].v;
            var m09 = sht["K" +(r + 1)].v;
            var m10 = sht["L" +(r + 1)].v;
            var m11 = sht["M" +(r + 1)].v;
            var m12 = sht["N" +(r + 1)].v;

            var error = "";
            var warning = "";

            var record = {
                row: r - startRow + 1,
                selected: true,
                product: product,
                year: year,
                m01: m01,
                m02: m02,
                m03: m03,
                m04: m04,
                m05: m05,
                m06: m06,
                m07: m07,
                m08: m08,
                m09: m09,
                m10: m10,
                m11: m11,
                m12: m12,
                error: error,
                warning: warning
            };

            $scope.lists.records.push(record);

        }

       $scope.lists.validation = [];
        for(var i = 0; i < $scope.lists.records.length; i++){
            $scope.lists.validation.push($scope.lists.records[i]);
        }
        $scope.validate();
    };
      
    $scope.validate = function() {
       
        // Function gets the first record and then validates its contents
        if ($scope.lists.validation.length > 0){
            //shift() remove a record once it has been investigated
            var record = $scope.lists.validation.shift();
            var count = 0;
            record.selected = false;
            // Check for duplicate record
            for(var i = 0; i < $scope.lists.records.length; i++){
                if(record.product == $scope.lists.records[i].product){
                    count++;
                }
            }
            if(count > 1){
                    record.selected = false;
                    $scope.values.errorCount = $scope.values.errorCount + 1 ;
                    record.error = record.product + "Duplicate record found.";
            }else{
                if ($scope.lists.productListCaptured.indexOf(record.product) >= 0) {
                       
                        record.selected = true;
                          console.log("selected", record.product);
                        
                }else{
                        record.error += record.product + " does not exist in Product dimension.";
                        record.selected = false;
                        $scope.values.errorCount = $scope.values.errorCount + 1 ;
                }
             
            }
            // Check the product
           // $tm1Ui.dimensionElement("dev", "Product", record.product).then(function(value){
             //   if (value == undefined){
               //     record.error += record.product + " does not exist in Product dimension.";
                //    record.selected = false;
                //    $scope.values.errorCount = $scope.values.errorCount + 1 ;
               // }
            //}); 
           
           
            // Loop Through all the Months and check if value == 0
            for(var m = 0; m < 12; m++){
                var monthID = 'm'+ ( m < 10 ? '0'+m : m );
                var monthValue = record[monthID];
                if (monthValue == '0'){
                    record.warning += $scope.lists.months[m].description + " value is 0.";
                    $scope.values.warningCount = $scope.values.warningCount + 1 ;
                }
            }
            $scope.validate();
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

    $scope.countProjectsToBeUploaded = function (){
        $scope.values.projectsToBeUploaded = 0;
        for(var i = 0; i < $scope.lists.records.length; i++){
            var record = $scope.lists.records[i];
            if(record.selected){
                $scope.values.projectsToBeUploaded += 1;
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
            $scope.values.projectUploaded = 0;
            for(var i = 0; i < $scope.lists.records.length; i++){
                var record = $scope.lists.records[i];
                if (record.selected){
                    $scope.values.projectUploaded ++ ;
                    // LOOP THROUGH THE MONTHS
                    for(var m = 1; m <= 12; m++){
                        var monthID = 'm'+ ( m < 10 ? '0'+m : m );
                        var monthValue = record[monthID];
                        var monthTM1 = $scope.lists.months[m-1];
                        var request = {
                                value: monthValue, 
                                instance:"dev", 
                                cube: $scope.defaults.cube, 
                                cubeElements:[$scope.selections.version, 
                                            $rootScope.selections.year,
                                            monthTM1.key, 
                                            $scope.selections.currency, 
                                            $scope.selections.region, 
                                            record.product,
                                            $scope.selections.measure]
                                }
                        $scope.lists.cellPutRequests.push(request);
                    }
                } 
            }
            $tm1Ui.cellsetPut($scope.lists.cellPutRequests).then(function(){
                $scope.values.valuesSentToTM1 = true;
                $scope.functions.refreshGroup('Group 1');
                $scope.selections.panelClass = 'panel-success';
                $scope.selections.panelTitle = $scope.values.panelMessageUploaded;
                $timeout(function() { 
                                    $scope.values.valuesSentToTM1 = false;
                                    $scope.selections.panelClass = 'panel-primary';
                                    $scope.selections.panelTitle = $scope.values.panelMessageClick;
                                    }, 5000
                        );
            }); 
        }
    };
    // END OF THE CONTROLLER
}]);