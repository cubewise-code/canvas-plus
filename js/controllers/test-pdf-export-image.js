app.controller('testpdfexportimageCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', 'PDFViewerService',  '$http', function($scope, $rootScope, $log, $tm1Ui, pdf, $http) {
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
    $scope.pdfUrl = 'files/test.pdf';
    $scope.viewer = pdf.Instance("viewer");

	$scope.nextPage = function() {
		$scope.viewer.nextPage();
	};

	$scope.prevPage = function() {
		$scope.viewer.prevPage();
	};
    $scope.gotoPage = function(num) {
		$scope.viewer.gotoPage(num);
	};
    $rootScope.pdfPageLoaded = function(passedPageLoaded){
       // console.log(passedPageLoaded, "passedPageLoadedpassedPageLoadedpassedPageLoaded")
    }
	$scope.pageLoaded = function(curPage, totalPages) {
		$scope.currentPage = curPage;
		$scope.totalPages = totalPages;
        console.log("page loaded", curPage, totalPages, "TAKE A SCREEN SHOT NOW!!!" );
        if($scope.currentPage === totalPages){
            console.log("FINAL PAGE STOP - SEND TO SCREEN SHOTS")
        }else{
            var canvas = document.getElementById('canvas-view');
            var context = canvas.getContext('2d'); 
            var image = canvas.toDataURL();
           // console.log("dataURL", image);
            appendFileAndSubmit(image);
        }

	};

    function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(b64Data);
                var byteArrays = [];

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    } 
                    var byteArray = new Uint8Array(byteNumbers); 
                    byteArrays.push(byteArray);
                }

              var blob = new Blob(byteArrays, {type: contentType});
              return blob;
            }

            $("#myAwesomeForm").submit(function(e){
                e.preventDefault();
                 
            });

            function appendFileAndSubmit(imagedata){
                // Get the form
                var form = document.getElementById("myAwesomeForm");

                var ImageURL = imagedata;
                // Split the base64 string in data and contentType
                var block = ImageURL.split(";");
                // Get the content type
                var contentType = block[0].split(":")[1];// In this case "image/gif"
                // get the real base64 content of the file
                var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

                // Convert to blob
                var blob = b64toBlob(realData, contentType);

                // Create a FormData and append the file
                var fd = new FormData(form);
                var d = new Date();
                var ff = d.getTime();

                fd.append("image", blob, "report-file"+ff+".jpeg");
                $.ajax({
                    url:"api/files/dev/upload-parameter/save",
                    data: {internalInstancePath: "other_folder"}, 
                    type:"POST",
                    // Change this according to your response from the server.
                    error:function(err){
                        //console.error(err);
                       // $scope.pageLoaded($scope.currentPage, $scope.totalPages);
		 
                    },
                    success:function(data){
                           
                       
                    },
                    complete:function(data){
                        console.log(data); 
                        
                         
                    }
                });
                 
                        $.ajax({
                        url:"api/file/upload/dev?retain-name=true",
                        data: fd,// the formData function is available in almost all new browsers.
                        type:"POST",
                        contentType:false,
                        processData:false,
                        cache:false,
                        dataType:contentType, // Change this according to your response from the server.
                        error:function(err){
                            //console.error(err);
                        // $scope.pageLoaded($scope.currentPage, $scope.totalPages);
            
                        },
                        success:function(data){
                            // console.log(data); 
                        
                        },
                        complete:function(data){
                            $scope.viewer.nextPage();
                           // console.log("Request finished.", data);
                            
                        }
                    });
                // Submit Form and upload file
                 
            }

}]);
