app.controller('HomeCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	$rootScope.pageTitle = "Home";
	$timeout( function(){ 
        if(document.getElementById('home-nav-btn')){
            document.getElementById('home-nav-btn').setAttribute("class", "active");
			$rootScope.activeTab = -1;
        }
       
    }, 100); 
}]);
