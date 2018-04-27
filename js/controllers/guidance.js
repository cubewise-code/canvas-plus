app.controller('guidanceCtrl',  ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	$rootScope.pageTitle = "Guidance";
	$timeout( function(){ 
        if(document.getElementById('level-one-guidance')){
            document.getElementById('level-one-guidance').setAttribute("class", "active");
			$rootScope.activeTab = -1;
        }
       
    }, 100); 
    
}]);
