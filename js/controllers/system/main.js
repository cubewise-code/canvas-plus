
app.controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', '$location', '$ngBootbox', '$compile', '$tm1Ui',
                            function($scope, $rootScope, $timeout, $state, $stateParams, $location, $ngBootbox, $compile, $tm1Ui) {
	
	// Contains the menu control
	$scope.menu = {};
	// contains the menu items
	$scope.menuData = [];	
	
	// Store search box stuff
	var searchLast = 0;
	$scope.menuSearch = {};
	$scope.menuSearchData = [];
	$scope.parameters = { search: "" };
	
	$scope.print = {
		pageOrientation: "Landscape",
		pageSize: "A4"
	};
	
	// this controller reference
	var _controller = this;
	
	
	// load menu from a file
	$tm1Ui.applicationMenus().then(function(menus){
		$scope.menuData.push(menus);
		
		// Add the menu to a cache to be used for searching
		$scope.menuCache = _.cloneDeep($scope.menuData);	
		
		// find the sample and under it, components and application index if present
		$rootScope.samplesMenuIndex = -1;		
		if($scope.menuData[0] && $scope.menuData[0].children){		
			for(var i = 0; i < $scope.menuData[0].children.length; i++){
				if($scope.menuData[0].children[i].data && $scope.menuData[0].children[i].data.page && $scope.menuData[0].children[i].data.page == 'sample'){
					$rootScope.samplesMenuIndex = i;
					
					break;
				}
			}
		}
		
		function findSamplesMenuIndex(menuData, samplesMenuIndex, page){
			var index = -1;
			
			if(menuData && menuData[0] && menuData[0].children && menuData[0].children[samplesMenuIndex] && menuData[0].children[samplesMenuIndex].children){		
				for(i = 0; i < menuData[0].children[samplesMenuIndex].children.length; i++){
					if(menuData[0].children[samplesMenuIndex].children[i].data && menuData[0].children[samplesMenuIndex].children[i].data.page && menuData[0].children[samplesMenuIndex].children[i].data.page == page){
						index = i;
						
						break;
					}
				}
			}
			
			return index;
		}
		
		$rootScope.samplesComponentMenuIndex = findSamplesMenuIndex($scope.menuData, $rootScope.samplesMenuIndex, 'component');
		$rootScope.samplesApplicationMenuIndex = findSamplesMenuIndex($scope.menuData, $rootScope.samplesMenuIndex, 'application');
		$rootScope.samplesTemplatesMenuIndex = findSamplesMenuIndex($scope.menuData, $rootScope.samplesMenuIndex, 'templates');
		
		$rootScope.menuData = _.cloneDeep($scope.menuData);
	});
	
	// Get the details of the instances from the java servlet
	$tm1Ui.applicationInstances().then(function(instances){
		$rootScope.instances = _.cloneDeep(instances);
	});
	
	var searchTimeout = false;
	
	$scope.isCopied = false;
	$scope.copySuccess = function(){
		$scope.isCopied = true;
		$timeout(function(){
			$scope.isCopied = false;
		}, 5000); 
	};
	
	$scope.search = function(){
		
		if(_.isEmpty($scope.parameters.search)){
			// Reset the menu
			$scope.menuSearchData = [];
			$scope.selectBranch($state.current.name, $stateParams);
		}
		else {
			
			var now = new Date();
			if(now.getTime() - searchLast < 500){
				// Search again later if it has been less than 500 ms and one hasn't already been scheduled
				if(searchTimeout == false){
					searchTimeout = true;
					$timeout(function(){
						searchTimeout = false;
						$scope.search();
					}, 500);
				}
				return;
			}
			
			var searchTerm = $scope.parameters.search.toLowerCase();
			
			// Search for items
			$scope.menuSearchData = [];
			searchBranch($scope.menuCache, searchTerm, $scope.menuSearchData);
		
			now = new Date();
			searchLast = now.getTime();
		}
		
	}
	
	var searchBranch = function(children, searchTerm, result){
		// Search recursively for leaf elements containing the search term
		if(children){
			for(var i = 0; i< children.length; i++){
				var branch = children[i];		
				if(branch.label.toLowerCase().indexOf(searchTerm) > -1){
					// Add the item to the search result
					result.push(branch);
				}
				searchBranch(branch.children, searchTerm, result);
			}
		}
	}
	
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){			
		// save last known state
		$rootScope.priorState = {
				state: fromState,
				param: fromParams
		};
		
		// This is used to select the item in the menu when navigating to a page
		
		// Get the parameters
		$scope.page = toState.name;
		$scope.parameters = toParams;
		
		// Select the branch in the menu
		$scope.selectBranch($scope.page, $scope.parameters);
	});
		
	$scope.menuSelect = function(branch){
		// Menu item clicked event handler
		// Navigate to the page
		
		if(!branch){			
			return;
		}
		
		if(branch.data && branch.data.page){			
			$rootScope.$broadcast('menu.branch.select', branch);	
			$state.transitionTo(branch.data.page, branch.data.parameters);
		}		
	}
	
	$scope.menuGenerateUrl = function(branch){
		
		if(!branch){			
			return "";
		}
		
		try {
			var url = $state.href(branch.data.page, branch.data.parameters);
			return url;
		}
		catch (e) {
			return "";
		}
	}
	
	$scope.selectBranch = function(page, parameters){
		
		// Used to select the menu item when a user navigates via the address bar
		
		var branch = null;
		
		if(page == "home" || page == "login" || page == "notfound"){	
			$scope.menu.deselect_branch();
			return;
		}
		else if(!page){
			$scope.menu.deselect_branch();
			return;
		}
		
		var branch = findBranch($scope.menuData, page, parameters);
		if(branch){			
			$scope.menu.select_branch(branch);
		}
		
	}
	
	var findBranch = function(children, page, parameters){
		// Recursively look for the menu
		if(children){
			for(var i = 0; i< children.length; i++){
				var branch = children[i];
				if(branch.data && branch.data.page && branch.data.page == page && _.eq(branch.data.parameters, parameters)){
					return branch;
				}
				var result = findBranch(branch.children, page, parameters);
				if(result){
					branch.expanded = true;
					return result;
				}
			}
		}
		return null;
	}
	
	$scope.pageUrlEncoded = function() {
		return encodeURIComponent($location.absUrl());
	};
	
	$scope.pageUrl = function() {
		return $location.absUrl();
	};
	
	// angular version
	$scope.angularVersion = angular.version;
	
	// on Pop-up mode for login
	$scope.$on('tm1.event.login', function(event, args){		
		if(!$scope.showingLogin){
			$scope.showingLogin = true;
			
			if($scope.loginSuccess == undefined){
				$scope.loginSuccess = function(instance){
					angular.element(document.querySelector('#wrapper')).removeClass('background-login');					
					$scope.showingLogin = false;
					$ngBootbox.hideAll();
					$scope.loginScope.$destroy();
					
					if(!_.isEmpty(instance)){
						$state.reload($state.current.name);
					}					
				};
			}
			
			var loginElement = $compile('<div style="margin-top: 5%;"><tm1-ui-login tm1-after-login="loginSuccess(instance)" tm1-default-instance="' + args.instance + '"></tm1-ui-login></div>');
			$scope.loginScope = $scope.$new();
	    	
	    	$scope.loginOptions = {
		        message: loginElement($scope.loginScope),
		        buttons: {},
		        onEscape: function() { 
		        	$scope.loginSuccess('');
		        },
		        className: 'tm1-login-modal',
		        backdrop: false
		    };
		
			$ngBootbox.customDialog($scope.loginOptions);				
			angular.element(document.querySelector('#wrapper')).addClass('background-login');
			
			// https://getbootstrap.com/docs/3.3/javascript/#modals
			// fix on autofocus not working on popup mode			
			$('.tm1-login-modal').on('shown.bs.modal', function() {
				$(this).find('#tm1-login-user').focus();
			});
		}
	});
}]);
