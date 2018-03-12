app.controller('Menu1Ctrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
	$scope.instances = [];
	$scope.page = {instance: ''};
	
	// get available instances
	$http.get('api/instances').then(function(success, error){
		if(success.status == 200 && angular.isDefined(success.data) && success.data.length > 0){
			angular.forEach(success.data, function(instance){
				$scope.instances.push(instance.name);
			});
			
			$scope.page.instance = $scope.instances[0];
			$scope.getConfiguration();
		}
	});
	
	$scope.getConfiguration = function(){
		$http.get('api/instances/' + $scope.page.instance).then(function(success, error){
			$scope.config = success.data
		});
	};
}]);