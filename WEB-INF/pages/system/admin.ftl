<!doctype html>

<html lang="en" ng-app="app" ng-strict-di="true">
  <head>
  
    <meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">    
    <link rel="icon" href="images/icon.png" type="image/png">
    
  	<title>${settings.getApplicationName()} - Admin Console</title>
    
    <script src="admin/sso/xdomain.canvas.js"></script>
    <script>
      var appSettings = {
           showSideBar: ${settings.getShowSideBar()?c},
           useCustomNavigation: false,
           isDemo: ${settings.isDemo()?c},
           showOIDCErrorDisplay: ${settings.getEnableOIDCErrorDisplay()?c},
           ssoInactiveMessage: "${settings.getSsoInactiveMessage()}"
      };
      
      var ssoSlaves = {};
      var customAngularModules = [];
      
      <#include "../header.script.init.ftl">
      
      xdomain.slaves(ssoSlaves);
    </script>
    
    <script src="assets/js/libs.${canvasVersion}.js"></script>
    <script src="admin/js/bootstrap.${canvasVersion}.js"></script>

    <script src="admin/js/ace/ace.js?v=${canvasVersion}"></script>
    <script src="admin/js/ace/ext-language_tools.js?v=${canvasVersion}"></script>
    
    <script src="admin/js/ace/ui-ace.js?v=${canvasVersion}"></script>
        
    <script src="admin/app.${canvasVersion}.js"></script>
    <script src="admin/js/admin.${canvasVersion}.js"></script>
    
    <link href="assets/css/libs.${canvasVersion}.css" rel="stylesheet">
    <link href="admin/css/bootstrap/${settings.getAdminTheme()}/bootstrap.css?v=${canvasVersion}" rel="stylesheet">
    <link href="admin/app.${canvasVersion}.css" rel="stylesheet">
    

    
  </head>
  <body>
    <div id="wrapper-pending-sso" ng-if="!$root.applicationIsReady">    
      <#include "../page.pending.sso.ftl">
    </div>
   
    <div id="wrapper" ng-if="$root.applicationIsReady">    
      <div ng-controller="MainCtrl as mainCtrl" >
    
    	<!-- <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0; z-index: 6000;"> -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="min-height: 50px;">
                        
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" ng-click="navbarToggle()" style="margin: 8px 0px 0px 5px;">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
          	<a href="#">
              <img src="images/logo.png" title="Your Logo Here" style="background-size:contain; height: 40px;"></img>
            </a>
          </div>
         
          <ul class="nav navbar-top-links navbar-right" style="margin-top: 0px;">
              <li>
                <span class="panel panel-warning" ng-if="license.isValid && license.daysRemaining < 15">
                  <span class="panel-heading">{{license.daysRemaining}} Days Remaining</span>
                </span>
                <span class="panel panel-danger" ng-if="!license.isValid">
                  <span class="panel-heading">{{license.message}}</span>
                </span>
              </li>
          		<li><tm1-ui-session></tm1-ui-session></li>
          		<!-- <li>(<ng-include src="'./html/version.html'"></ng-include>)</li>  -->
                <li class="dropdown  hidden-xs">
                  <a class="dropdown-toggle" data-toggle="dropdown" >
                      <i class="fa fa-bell fa-fw"></i>&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-alerts">
                    <li class="alert" ng-repeat-start="item in alerts">
                      <i class="fa fa-bell fa-fw"></i> <span class="text-muted small" >{{ item.AlertTime | amCalendar }}</span>        
                      <div>{{ item.Description }}</div>
                    </li>
                    <li class="divider" ng-repeat-end></li>
                  </ul>
                </li>
            </ul>
        </nav>
        
        <!-- <nav class="navbar-fixed-top" role="navigation" style="margin-bottom: 0"> -->
        <nav class="navbar-fixed-top" role="navigation">
        
            <div class="navbar-default sidebar" role="navigation">
            	<!-- <div style="padding: 10px;"> -->
                <div class="sidebar-nav navbar-collapse" style="padding: 10px;">
                  <input id="searchTerms" type="text" ng-model="parameters.search" ng-keyup="search()" class="form-control" placeholder="Search..." />
                </div>
                <div class="sidebar-nav navbar-collapse" ng-if="parameters.search && parameters.search.length" >
                  <abn-tree tree-data="menuSearchData" tree-control="menuSearch" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch)" on-generate-url="menuGenerateUrl(branch)" ></abn-tree>
                </div>
                <div class="sidebar-nav navbar-collapse" ng-if="!parameters.search || !parameters.search.length" >
                  <abn-tree tree-data="menuData" tree-control="menu" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch)" on-generate-url="menuGenerateUrl(branch)"></abn-tree>
                </div>
            </div>
        </nav>
        
      </div>
       
      <div>
        <div id="page-wrapper" ng-init="$root.resizeSideBar()" >
          <section ui-view></section>
        </div>
      </div>

    </div>
  
  </body>
</html>
