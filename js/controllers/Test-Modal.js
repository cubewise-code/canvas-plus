app.controller('TestModalCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', function($scope, $rootScope, $log, $tm1Ui) {
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
    $rootScope.pageTitle = "Modal Chart";


$rootScope.doMouseOver = function(e){
    
     
    if(document.getElementsByClassName("nvtooltip xy-tooltip").length){
       
        var objToCopy = document.getElementsByClassName('nvtooltip xy-tooltip')[0].innerHTML;
         
        tmp = document.getElementById('tooltip');
        tmp.setAttribute("style" , "top: 0px; left: 0px; opacity: 1; padding:0px;z-index:9999; padding:10px; background-color:#fff; position: fixed; transform: translate("+(e.clientX + 20)+"px, "+((e.clientY)+20)+"px ) !important") ;      
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
    var divTolltipContainer = document.createElement("div"); 
    divTolltipContainer.setAttribute('id', 'tooltip');
    divTolltipContainer.setAttribute('class', 'nvtooltip xy-tooltip'); 
    document.getElementById("myModal").appendChild(divTolltipContainer);  
}

}]);
