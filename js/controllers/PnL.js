app.controller('PnLCtrl', ['$scope', '$rootScope', '$tm1Ui','$timeout', '$window', function($scope, $rootScope, $tm1Ui, $timeout, $window) {
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
    $scope.config = {
        itemsDisplayedInList:10
    };
      
 
  $scope.images = [];
  $scope.dataRefresh = function(name){
 $scope.config.itemsDisplayedInList =10;
    $scope.images = [];
    $scope.data = null;
    $timeout( function(){
 console.log("refresh");
     $tm1Ui.dataRefresh();
    })
     
  }
  $scope.loadMore = function(data) {
       var last = $scope.images[$scope.images.length - 1];
      if($scope.config.itemsDisplayedInList < data.length){
            $scope.config.itemsDisplayedInList++;
            console.log("loading rows", $scope.images.length, $scope.data.length);
              $scope.images.push(data[$scope.images.length]);
      }
  }
          
  $scope.loadFirst = function(data) {
    $scope.headerHtml = document.getElementById('header-content').innerHTML;
    //document.getElementById("fixed-header").innerHTML = $scope.headerHtml;
    document.getElementById('dynamic-table').style.height = "auto";
    document.getElementById('dynamic-table').style.height = window.innerHeight - (document.getElementById('dynamic-table').getBoundingClientRect().top)+'px';
    console.log((document.getElementById('dynamic-table').style.height).split("px").join(''));
     $scope.config.itemsDisplayedInList =  Math.round(  (document.getElementById('dynamic-table').style.height).split("px").join('')/53 );
     for(var i in data)
      if( parseInt(i) <= $scope.config.itemsDisplayedInList){
            
            console.log("loading rows", $scope.images.length, $scope.data.length);
              $scope.images.push(data[$scope.images.length]);
      } 
    }
    $scope.scrollPos = 0;

        $window.onscroll = function(){
            $scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
        
             document.getElementById("header-content").style.marginLeft = "-"+document.documentElement.scrollLeft+ "px";
             document.getElementById("fixed-side-content").style.marginTop = "-"+document.documentElement.scrollTop+ "px";
            $scope.$apply(); //or simply $scope.$digest();
        };

       
}]);
 
 