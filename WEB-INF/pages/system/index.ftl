<!doctype html>

<html lang="en" ng-app="app" ng-strict-di="true">
  <head>
  
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="images/icon.png" type="image/png">
    
    <title>${settings.getApplicationName()}</title>
    
    <script src="assets/sso/xdomain.canvas.js"></script>    
    <script type="text/javascript">
      var appSettings = {
           showSideBar: ${settings.getShowSideBar()?c},
           useCustomNavigation: false,
           isDemo: ${settings.isDemo()?c},
           showWatchCounter: ${settings.showWatchCounter()?c},
           isPopupLoginMode: ${settings.getEnablePopupOnLogin()?c},
           showSystemDiagnostics: ${settings.showSystemDiagnostics()?c},
           showOIDCErrorDisplay: ${settings.getEnableOIDCErrorDisplay()?c},
           ssoInactiveMessage: "${settings.getSsoInactiveMessage()}",
           fullPageReloadOnLogin: ${settings.getFullPageReloadOnLogin()?c}
      };
      
      var ssoSlaves = {};
      var customAngularModules = [];
      if(appSettings.isDemo){
        customAngularModules.push('angular-js-xlsx');
      }
      
      <#include "../header.script.init.ftl">
      
      xdomain.slaves(ssoSlaves);
      
    </script>
  
    <!-- Polyfill(s) -->
    <script src="assets/js/polyfills/ng-file-upload-shim.min.js?v=${canvasVersion}"></script>
      
    <!-- Normal JS Libraries -->
    <script src="assets/js/libs.${canvasVersion}.js"></script>
    <script src="assets/js/bootstrap.${canvasVersion}.js"></script>   
    
    <!-- Ace Library -->
    <script src="assets/js/ace/ace.js?v=${canvasVersion}"></script>
    <script src="assets/js/ace/ext-language_tools.js?v=${canvasVersion}"></script>    
    <script src="assets/js/ace/ui-ace.js?v=${canvasVersion}"></script>             
                     
    <script src="assets/app.${canvasVersion}.js"></script>
    <script src="js/client.startup.js?v=${canvasVersion}"></script>
    
  <#if settings.isDemo() >
    <script src="assets/js/optional/libs.opt.sheetjs.js"></script>
    <script src="client-assets/sample.js?v=${canvasVersion}"></script>   
    
    <script src="js/lib/tm1ui.sparkline.js" ></script>
    
    <#if settings.enableDemoMapsAPI() >
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_SxCyFF-4FNJmu11vs2BTYjI_YI3oNwk&libraries=visualization"></script>
    </#if>    
  </#if>
    <script src="client-assets/client.system.js?v=${canvasVersion}"></script>    
    
    <link href="assets/css/libs.${canvasVersion}.css" rel="stylesheet">
    <link href="assets/css/bootstrap/${settings.getTheme()}/bootstrap.css?v=${canvasVersion}" rel="stylesheet">
    <link href="assets/app.${canvasVersion}.css" rel="stylesheet" >
    
    <!-- User Defined Libraries / Scripts -->
    <#include "../header.library.ftl">        
    <link href="client-assets/client.css?v=${canvasVersion}" rel="stylesheet">
        
    <script type="text/javascript">    
      <#include "../header.script.others.ftl">   
    </script>    
    <script src="client-assets/client.js?v=${canvasVersion}"></script>
    
  </head>
  <body>
   <div id="wrapper-pending-sso" ng-if="!$root.applicationIsReady">    
    <#include "../page.pending.sso.ftl">
    
    <div ng-if="oidcError">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="panel panel-danger">
            <div class="panel-heading"><pre class="tm1-ui-oidc-error">{{oidcError | json}}</pre></div>
          </div>
        </div>
      </div>
    </div>
    
   </div>
   
   <div id="wrapper" ng-if="$root.applicationIsReady" ng-show="$root.showApplication">    
      <div ng-controller="MainCtrl as mainCtrl" >
        <div id="page-status" ng-hide="true" ng-if="$root.isLoading">LOADING</div>
        <div id="page-status" ng-hide="true" ng-if="!$root.isLoading">READY</div>
        
        <nav class="navbar-canvas navbar-default navbar-fixed-top" role="navigation">
          <#if settings.getShowSideBar()>
            
            <ul id="mobilebtn" class="mobilenavbtn nav navbar-right hidden-print"> 
              <li>
                <div class="mobile-btn">
                  <a ng-click="navbarMobileToggle()">
                    <i class="fa fa-fw fa-bars fa-lg"></i>  
                  </a>
                </div>
              </li>
            </ul>

          </#if>
          
          <#include "../navigation.top.left.ftl">               
          <#include "../navigation.logo.ftl">
          
          <ul class="nav navbar-top-links-v2 navbar-right margintop13 visible-print-block">
            <li><span class="timepanel">{{$root.printDate | date:'medium'}}</span></li>
          </ul>
          
          <ul class="nav navbar-top-links-v2 navbar-right hidden-print">
              <li ng-show="$root.licenseStatus.isReady">
                <span class="panel panel-warning" ng-if="license.isValid && license.daysRemaining < 15">
                  <span class="panel-heading">{{license.daysRemaining}} Days Remaining</span>
                </span>
                <span class="panel panel-danger" ng-if="license.message.length">
                  <span class="panel-heading">{{license.message}}</span>
                </span>
              </li>
              <li class="hidden-xs"> 
                <tm1-ui-session></tm1-ui-session> 
              </li>
              <li class="dropdown hidden-xs">
                <a class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-share-alt fa-fw"></i>&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu nav-dropdown">
                  <li class="paddingtop10">                    
                    <span>
                      <select ng-model="print.pageOrientation" class="form-control printpageformat">
                        <option>Landscape</option>
                        <option>Portrait</option>
                      </select>
                      <select ng-model="print.pageSize" class="form-control printdropdown">
                        <option>A5</option>
                        <option>A4</option>
                        <option>A3</option>
                        <option>Letter</option>
                        <option>Tabloid</option>
                      </select>
                      
                      <select ng-model="print.outputType" class="form-control printdropdown">
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                      </select>
                    </span>
                    
                    <#if settings.getPrinterVersion() == "1">
                    <a href="print.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}" target="_blank">
                    <#else>
                    <a href="print-v2.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}&output-type={{print.outputType}}" target="_blank">
                    </#if>
                        <i class="fa fa-print fa-fw marginright15"></i> <span translate="PRINT" class="marginright15"></span>
                    </a>
                  </li>
                  
                  <li role="separator" class="divider"></li>
                  <li>
                      <a href="" ngclipboard data-clipboard-text="{{pageUrl()}}" ngclipboard-success="copySuccess(e);">
                        <i class="fa fa-clipboard fa-fw marginright15"  ></i> <span translate="COPYTOCLIPBOARD"></span>
                        <span class="pull-right">
                          <span ng-if="isCopied" class="label label-default" translate="COPIED"></span>
                        </span>
                      </a>
                  </li>
                </ul>                  
              </li>
             
              <#include "../navigation.top.right.ftl">
              
            </ul>
        </nav>
         
        <#include "../navigation.body.custom.ftl">
          
        <div ng-show='!$root.useCustomNav' class="hidden-print">           
        <#if settings.getShowSideBar() >
          <div ng-show="$root.mobileview">
            <div id="mobile-nav" class="navbar-canvas navbar-default  mobile-nav" ng-class="mobilenavdecider ? 'mobile-open' : 'mobile-closed'">
              <div id="searchcon" class="mobile-search">
                <input id="searchTerms" type="text" ng-model="parameters.search" ng-keyup="search()" class="form-control search-container" placeholder="Search..." />
              </div>
              <div ng-if="parameters.search && parameters.search.length">
                <abn-tree tree-data="menuSearchData" tree-control="menuSearch" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch); navbarMobileToggle();" ng-click="menuTest(); " on-generate-url="menuGenerateUrl(branch)"></abn-tree>
              </div>
              <div ng-if="!parameters.search || !parameters.search.length"  >
                <abn-tree tree-data="menuData" tree-control="menu" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch); navbarMobileToggle();" ng-click="menuTest($event);  " on-generate-url="menuGenerateUrl(branch)"></abn-tree>
              </div>
            </div>
          </div>
        </#if>
        <#if settings.getShowSideBar()>
          <nav class="navbar-fixed-top" role="navigation">
            <div id="left-nav-section-v2" class="navbar-default sidebar-v2" role="navigation" ng-mouseleave="moveNavOut()">
              <div id="nav-section" ng-scroll="setDimensions($event)">              
                <div id="openednav">
                  <div id="searchcon" class="sidebar-v2-nav search-bar navbar-collapse " ng-class="navisopened ? 'opened' : 'closed'" >
                    <input  ng-if="navisopened" id="searchTerms" type="text" ng-model="parameters.search" ng-keyup="search()" class="form-control search-container" placeholder="Search..." />                      
                    <i ng-click="uiPrefs.isPinned =!uiPrefs.isPinned;"  class="fa fa-thumb-tack fa-sm pin " ng-if="uiPrefs.menu" ng-class="uiPrefs.isPinned ? 'fa-rotate-0':'fa-rotate-90'"></i>                 
                  </div>
                  <div class="sidebar-v2-nav navbar-collapse margintop50" ng-if="parameters.search && parameters.search.length">
                    <abn-tree ng-if="navisopened" tree-data="menuSearchData" tree-control="menuSearch" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch)" ng-click="menuTest()" on-generate-url="menuGenerateUrl(branch)"></abn-tree>
                  </div>
                  <div class="sidebar-v2-nav navbar-collapse margintop50" ng-if="!parameters.search || !parameters.search.length"  >
                    <abn-tree ng-show="navisopened" tree-data="menuData" tree-control="menu" icon-expand="fa fa-caret-right" icon-collapse="fa fa-caret-down" on-select="menuSelect(branch)" ng-click="menuTest($event)" on-generate-url="menuGenerateUrl(branch)"></abn-tree>
                  </div>
                </div>
                <div id="mininav" class="mininav ministart" ng-show="!navisopened">         
                  <div id="mininavinternal" >
                    <ul class="nav side-nav-v2" >
                      <li style="margin-left: 0px;">
                        <a ng-click="navbarToggle(); scrollToHash(); hideTooltip(-2) " ng-mouseleave="hideTooltip(-2)" ng-mouseover="showTooltip(-2, 'Menu')"><i class="fa fa-fw fa-bars fa-1x"></i>  </a>
                      </li>
                      <li style="margin-left: 0px;">
                        <a ng-click="hideTooltip(-1)" ng-mouseleave="hideTooltip(-1)" ng-mouseover="showTooltip(-1, 'Home')" href="#/"><i class="fa fa-fw fa-home fa-1x"></i>  </a>
                      </li>
                      <li style="margin-left: 0px;" ng-repeat="item in menuData[0].children" ng-init="initColor()">
                        <a ng-click="hideTooltip($index)" ng-click="clickedNav($index)" ng-mouseleave="hideTooltip($index)" ng-mouseover="showTooltip($index, item.label)" ng-href="#/{{findClickthrough(item.data.page)}}"><i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>  </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </#if>
        </div>
      </div>
       
      <div>
        <div id="page-wrapper" class="start" autoscroll ng-init="$root.resizeSideBar()">
          <#include "../page.header.ftl">
          <section id="page-view" ui-view></section>
          <#include "../page.footer.ftl">
        </div>
      </div>

    </div>
    <div id="mini-tooltip" class="mini-tooltip"></div>
  </body>
 
</html>
