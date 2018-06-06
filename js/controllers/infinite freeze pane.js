app.controller('infinitefreezepaneCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$tm1UiTable', '$timeout', '$document', 
function($scope, $rootScope, $log, $tm1Ui, $tm1UiTable, $timeout, $document) {
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
    $scope.cubeUsed = 'General Ledger';
    $rootScope.rowDriver = 'Account';
     
    $rootScope.rowDriverIndex = 6;
    $scope.config = {

       
         
        itemsDisplayedInList:10
    };
    
    $rootScope.columnDriver = 'Period';
    $scope.tmpcolAttribute = 'Short Description';
    $scope.page = {accounts: [] };
    $scope.rowHeightArray = [];
    $scope.images = [];
    $rootScope.pageTitle = 'Infinite Freeze Pane';
    $scope.loading = false;
    
     $scope.decideonAttributeName = function(){
         console.log("decide");
         $scope.tmpcolAttribute = 'Short Description';
          
     }
    
    $scope.dataRefresh = function(driver){
      
        $rootScope.rowDriver = driver ;
        $scope.loading = true ;
         $scope.config.itemsDisplayedInList = 0;
        $timeout( function(){
            
            $scope.columnEdit = false;
     
            $scope.rowEdit = false;
     
            $tm1Ui.dataRefresh();
            $scope.loading = false ;
        }, 1000)
    
     
    }
$scope.percentageDecider = [];
$scope.decideIfColumnIsPercentage = function(col, indexx){
      var columnNameHasPercentage = (col.alias).split('%');
      if($root.columnDriver === 'Version'){
          if(columnNameHasPercentage.length > 0){
            console.log("has %");
            $scope.percentageDecider[indexx] = true;
        }else{

            $scope.percentageDecider[indexx] = false;
        }
      }else{
          $scope.percentageDecider[indexx] = false;
      }
       
       console.log("length of %", $scope.percentageDecider);
  }
  $scope.dataRefreshColumn = function(driver){
        
        $scope.loading = true ;
        $rootScope.columnDriver = driver ;
        $scope.page.columnDimension = [];
        $scope.config.itemsDisplayedInList = 0;
        $timeout( function(){
         
        console.log('column selected', driver)
            if(driver === 'Period' ){
                
              //  $scope.page.columnDimension = $scope.config.months;
            } 
            $scope.rowEdit = false;
            $scope.columnEdit = false;
     
            $tm1Ui.dataRefresh();
            $scope.loading = false ;
        }, 1000)
    
     
    }
    $scope.clearSort = function(){ 
        $timeout( function(){
            console.log( $scope.table, $scope.table.isSorted(),  " $scope.table $scope.table $scope.table")
            $scope.table.sortClear();
            $scope.table.sort();
            $tm1Ui.dataRefresh();
        })
    }
    $scope.rowEdit = false;
    $scope.openRowElement = function(e){
        console.log("open row", e.target);
        $scope.rowEdit = true;
        e.target.style.height = "auto";
        e.target.style.width = "25%";
    }
    $scope.closeRowElement = function(e){
        console.log("open row", e.target);
        $scope.rowEdit = false;
        e.target.style.height = "41px";
        e.target.style.width = "20px";
    }

  $scope.columnEdit = false;
  $scope.createModel = function(row, columnName, columnalias){
        console.log(row, columnName);
        if($rootScope.columnDriver === 'Period' && columnName.indexOf('0') !== -1){
            var retempName = (columnalias)
        }else{
             var tmpName = (columnName + "").split(' ').join('');
        var retempName = (tmpName + "").split('%').join('');
        }
         
        
      
      return retempName;
  }
  $scope.isColumnPercentage = function(col){
      if(col.indexOf('%') !== -1){
        console.log('column is percentage', col);
        return true;
      }else{
          return false;
      }
       

  }
  $scope.openColumnElement = function(e){
      console.log("open column", e.target);
      $scope.columnEdit = true;
       e.target.style.height = "auto";
       e.target.style.width = "25%";
  }
   $scope.closeColumnElement = function(e){
      console.log("open column", e.target);
      $scope.columnEdit = false;
       e.target.style.height = "41px";
       e.target.style.width = "20px";
  }


  $scope.cellEdit =[];

   $scope.openCellElement = function(e, index){
      console.log("open row", document.getElementById('pop-up-'+index));
      var obj = document.getElementById('pop-up-'+index)
       
      obj.style.height = "auto";
       obj.style.width = "100%";
       obj.style.zIndex = "9";
       $scope.cellEdit[index] = true;
  }
   $scope.closeCellElement = function(e,index){
      console.log("close row", document.getElementById('pop-up-'+index));
       
        var obj = document.getElementById('pop-up-'+index);
       obj.style.height = "20px";
       obj.style.width = "20px";
       obj.style.zIndex = "1";
        $scope.cellEdit[index] = false;
  }



$scope.cubeDimensions = {};
    $tm1Ui.cubeDimensions("dev", $scope.cubeUsed).then(function(data){
  		console.info('Returned by this function - %o', data);
          $scope.cubeDimensions = data
	 });
  
  $scope.loadMore = function() {
      
        var last = $scope.images[$scope.images.length - 1];
        $scope.config.itemsDisplayedInList++;
        if($scope.config.itemsDisplayedInList < $scope.table.data().length){
          var data = $scope.table.data()
             
            //console.log("loading rows", $scope.images.length, $scope.table.data());
              $scope.images.push(data[$scope.images.length]);
        }
        $scope.rowHeightArray = [];
        if(document.getElementsByClassName('row-height-ind').length){

            for(var cc = 0; cc < document.getElementsByClassName('row-height-ind').length; cc++){
                var tmp = document.getElementsByClassName('row-height-ind')[cc];
                $scope.rowHeightArray.push(tmp.getBoundingClientRect().height);
                    
                // console.log('height', tmp.getBoundingClientRect().height, cc);
                
            }
        }
  }
          
  $scope.loadFirst = function(data) {
    
   tablescroll = new fixedTable($('#tablescroll'));
   asidescroll = new asideTable( $('#aside') );
   
     
     for(var i in $scope.table.data())
      if( parseInt(i) <= $scope.config.itemsDisplayedInList){
            
             //console.log("loading rows", $scope.images.length, $scope.table.data());
              $scope.images.push(data[$scope.images.length]);
      } 
    }

    
  $scope.filter = function(value){
 
   
    if(value){
        if($scope.page.filter && $scope.page.filter != ""){
       
            $scope.page.filterlower= $scope.page.filter.toLowerCase();
            if(value["Description"].toLowerCase().indexOf($scope.page.filterlower) == -1){
                return false;
            }
        }

    return true;
    }
     
 
  };


$rootScope.doMouseOver = function(e){
    
     
    if(document.getElementsByClassName("nvtooltip xy-tooltip").length){
       
        var objToCopy = document.getElementsByClassName('nvtooltip xy-tooltip')[0].innerHTML;
         
        tmp = document.getElementById('tooltip');
        tmp.style.opacity = 1;
        tmp.style.transform =  "translate("+(e.clientX + 20)+"px, "+((e.clientY)+20)+"px ) !important";
        //tmp.setAttribute("style" , "top: 0px; left: 0px; opacity: 1; padding:0px;z-index:9999; padding:10px; background-color:#fff; position: fixed; transform: translate("+(e.clientX + 20)+"px, "+((e.clientY)+20)+"px ) !important") ;      
        tmp.innerHTML =  objToCopy; 
        document.getElementsByClassName('nvtooltip xy-tooltip')[0].style.display = "none";
    }


}

$rootScope.doMouseOut = function(e){ 
    if(document.getElementsByClassName("nvtooltip xy-tooltip").length){
       
        var objToCopy = document.getElementsByClassName('nvtooltip xy-tooltip')[0].innerHTML; 
        tmp = document.getElementById('tooltip'); 
        tmp.setAttribute("style" , "top: 0px; left: 0px; opacity: 0; padding:0px;z-index:9999; padding:10px; background-color:#fff; position: fixed; transform: translate("+(e.clientX + 20)+"px, "+((e.clientY)+20)+"px ) !important") ;      
        tmp.innerHTML =  objToCopy; 
        document.getElementsByClassName('nvtooltip xy-tooltip')[0].style.display = "none";
    } 
}
$rootScope.pageLoaded = function(){
     
    if(!document.getElementById('tooltip')){
        var divTolltipContainer = document.createElement("div"); 
    divTolltipContainer.setAttribute('id', 'tooltip');
    divTolltipContainer.setAttribute('class', 'nvtooltip xy-tooltip'); 
    document.getElementById("myModal").appendChild(divTolltipContainer);  
    }
     
}
 
$scope.getHeight= function() {
        
          


   var top = document.getElementById("tablescroll").getBoundingClientRect().top;
    $scope.rowHeightArray = [];
    if(document.getElementsByClassName('row-height-ind').length){ 
        for(var cc = 0; cc < document.getElementsByClassName('row-height-ind').length; cc++){
            var tmp = document.getElementsByClassName('row-height-ind')[cc];
            $scope.rowHeightArray.push(tmp.getBoundingClientRect().height);
                
            // console.log('height', tmp.getBoundingClientRect().height, cc);
            
        }
    }
                
   return ((window.innerHeight) - ((top)+60));
}
  

  
    var fixedTable = function(el) {
         
		var $body, $header, $sidebar;
		$body = $(el).find('.fixedTable-body');
       // $scope.aside = document.getElementsByClassName('fixedTable-sidebar')[0];
       
		$sidebar = $(el).find('.fixedTable-sidebar table');
		$header = $(el).find('.fixedTable-header table');
        var top = document.getElementById("dynamic-table").getBoundingClientRect().top;
        $scope.config.itemsDisplayedInList = Math.round(((window.innerHeight) - ((top)+60))/37)+2;
        console.log('height container', $scope.config.itemsDisplayedInList);
          
 
		return $($body).scroll(function() {
             $scope.$apply(function() {       
            if($scope.config.itemsDisplayedInList < $scope.table.data().length){
        
              
                
                if( $scope.prevscrollTop != $($body).scrollTop()  ){
                        $scope.config.itemsDisplayedInList++;
                        $scope.prevscrollTop = $($body).scrollTop() ;
                        $scope.prevscrollLeft= $($body).scrollLeft() ;
                        $scope.loadMore();
                }
                 
                 
       
            }

             
                $('.fixedTable-sidebar').scrollTop( $($body).scrollTop() ); 
                $($header).css('margin-left', -$($body).scrollLeft());

              });
                return  ;
                  
                
             
		});
             
       
	};

   var asideTable = function(el) {
            
		var  $body, $aside;
		$body = $(el).find('.fixedTable-body table'); 
        $aside = $(el).find('#aside');
		return $('#aside').scroll(function() {
              
                     $scope.$apply(function() {        
                
                if( $scope.prevscrollTop != $('#aside').scrollTop()  ){
                        $scope.config.itemsDisplayedInList++;
                        $scope.prevscrollTop = $('#aside').scrollTop() ;
                        $scope.prevscrollLeft= $('#aside').scrollLeft() ;
                        $scope.loadMore();
                    }
                 
              
                  
                    $('.fixedTable-body').scrollTop( $('#aside').scrollTop() ); 
                });
                 
                
                
                return  ;
                  
                
             
		});
             
       
	};
      
     
    $(window).resize(function() {
      $scope.$apply(function() {
        $scope.rowHeightArray = [];
        if(document.getElementsByClassName('row-height-ind').length){

            for(var cc = 0; cc < document.getElementsByClassName('row-height-ind').length; cc++){
                var tmp = document.getElementsByClassName('row-height-ind')[cc];
                $scope.rowHeightArray.push(tmp.getBoundingClientRect().height); 
            }
        }
        var top = document.getElementById("dynamic-table").getBoundingClientRect().top;
        if(Math.round((((window.innerHeight) - ((top)+60))/37)+2) > $scope.config.itemsDisplayedInList   ){
               $scope.config.itemsDisplayedInList = Math.round(((window.innerHeight) - ((top)+60))/37)+2;
        }
      
        console.log($( window ).width(), "RESIZE       ######");
      });
    });
  $scope.firstPage = function(){
    var recordsPerPage = $scope.table._pageSize;
    $scope.table = $tm1UiTable.create($scope, $scope.page.accounts, {index: 1000, pageSize: recordsPerPage, preload: false, filter: $scope.filter});
  };

  $scope.lastPage = function(){
    var totalRecords = $scope.table._pages;
    var recordsPerPage = $scope.table._pageSize;
    var newIndex = Math.floor(totalRecords - recordsPerPage);
    $scope.table = $tm1UiTable.create($scope, $scope.page.accounts, {index: newIndex, pageSize: recordsPerPage, preload: false, filter: $scope.filter});
  };

  $scope.table = $tm1UiTable.create($scope, $scope.page.accounts, {pageSize: 1000, preload: false, filter: $scope.filter});
}]);
 