app.controller('HomeCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	$rootScope.pageTitle = "Home";
    $scope.defaults = {
        lineColorArray:["4181c3","40af9c","ffffff"],
    }
     $scope.versionPosition = {'position':0, 'alias':{'Actual':'Actual', 'Budget':'Budget', 'Last Year':'Last Year'}, 'elementVariance':{'Actual':'', 'Budget':'Var%','Last Year':'LY%' }};
	$timeout( function(){ 
        if(document.getElementById('home-nav-btn')){
            document.getElementById('home-nav-btn').setAttribute("class", "active");
			$rootScope.activeTab = -1;
        }
       
    }, 100); 
}]);
