<!-- This gets appended at the top for each page  -->
  
<div id="page-header"  ng-controller="headerCtrl" >
    <div ng-show='false'>
        <tm1-ui-user ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
    </div>
    <div id="mininavinternal"></div>
 

   
 
    <div style="position:fixed; top:0px; right:0px; z-index:9999; padding:10px; height:auto;"   >       
   
     
            <ul class="nav navbar-top-links-v2 navbar-right  " style="color:#fff !important; background-color:transparent !important;"  >
            
            <li class="dropdown " style="color:#fff !important; background-color:transparent !important;" >
                <span id="opened" ng-if="$root.user.Name"> 
                    <span class="inline-block-left" style="margin-right:5px;">{{mouseOverUserClose ? 'Sign Out: '+$root.user.Name+'': 'User: '+$root.user.Name}} </span> 
                        <span class="inline-block" >
                            <a href="" style="color:#fff;" 
                            ng-mouseleave="mouseOverUserClose = false" 
                            ng-mouseover="mouseOverUserClose = true;" 
                            ng-click=" closeApplication($root.hideView)" >
                                <i class="fa fa-user" aria-hidden="true"></i><sup><i class="fa fa-times text-right"  aria-hidden="true"></i></sup>

                            </a> 
                        </span>
                  <!--  <span class="inline-block" >
                        <tm1-ui-session></tm1-ui-session>
                    </span>-->
                    
                </span>
            </li>
            <li class="dropdown hidden-xs hidden-print" style="color:#fff !important; background-color:transparent !important;">
                <a class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-print fa-fw"></i>&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu nav-dropdown" >
                  <li class="paddingtop10" >                    
                    <span>
                      <select ng-model="print.pageOrientation" class="form-control printpageformat">
                        <option >Landscape</option>
                        <option>Portrait</option>
                      </select>
                      <select ng-model="print.pageSize" class="form-control printdropdown">
                        <option>A5</option>
                        <option>A4</option>
                        <option >A3</option>
                        <option>Letter</option>
                        <option>Tabloid</option>
                      </select>
                    </span>
                    <a href="print.pdf?url={{$root.pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}" target="_blank">
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
            

             
    </ul>
</div>
 
      
<div   
    class="nav" id="header" ng-init="animatePadding($root.defaultOffSet);"   
    ng-style="{'background-color':$root.applicationHeaderColor, 'padding-top':$root.hideView && $root.user.FriendlyName ? '69px': (!$root.hideView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}" 
    style=" transition-property:padding-top;  transition-duration: 1s; vertical-align: bottom !important; position:absolute; z-index:999;   position:fixed; top:0px; left:0px; width:100%;    " ng-mouseover="$root.top = 65"   >  
       <div style="transition-property:padding-top; transition-duration: 1s;  position:fixed; left:0px; top:0px; float:left; z-index:999; padding-top:0px;  "
     
       >
    <a href="#">
        <img src="images/logo.svg" 
        title="Your Logo Here" 
        style="background-size:contain; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999;" /> 
    </a>
  </div>
    
        <ul class="navbuttons"   style="vertical-align: bottom !important; margin:0px; padding-left:0px; background-color:transparent  " ng-mouseleave = "status.isopen = false;" >
          <li   ng-click="$root.activeTab = -1;  "   id="home-nav-btn" ng-class="$root.activeTab === -1 || $root.activeTabOver === 'home' ? 'active':''"
            ng-mouseover="$root.activeTabOver = 'home'"  ng-mouseleave="$root.activeTabOver = ''" >
                
                    <a href="#" data-toggle="tab"  > 
                       
                        <i  
                        class="fa fa-home fa-1x"></i>    <span class="hidden-xs"> Home </span> 
                    </a> 
                
            </li> 
            <li  id="level-one-{{((item.label)).split(' ').join('-').toLowerCase()}}"
                ng-mouseover="$root.activeTabOver = item.label; getLeftMargin('level-one-'+((item.label)).split(' ').join('-').toLowerCase()); "   ng-mouseleave="$root.activeTabOver = ''"
                ng-repeat="item in $root.menuData[0].children track by $index"   
                ng-show="$root.subPathBoolean === false"
                ng-if="item.label "
                ng-class="$root.activeTabOver === item.label  || $root.activeTab === $index ? 'active':''"
            > 
               
                <div class="btn-group" uib-dropdown dropdown-append-to-body outsideClick is-open="status.isopen"  >
                   
                    <a ng-href="#/{{findClickthrough(item.data.page)}}"  
                     style="padding-bottom:1em;" ng-mouseover = "status.isopen = true; $root.indexOver = $index;  " 
                     ng-click="$root.indexOver = $index;  $root.applicationTriggerFindUser();"   >
                            <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>   
                            <span class="hidden-xs"> 
                            {{item.label}}   
                            </span>
                            <span ng-if="$root.menuData[0]['children'][$index].children.length > 0" class="caret"></span>
                    </a>
                   <!-- <ul  ng-mousemove="$root.top = 65" class="dropdown-menu" uib-dropdown-menu role="menu"  aria-labelledby="btn-append-to-to-body" ng-if="$root.menuData[0]['children'][$index].children.length > 0" 
                   ng-style="'top':$root.top+'px !important'"
                    style="  margin-top: 14px; margin-left: 0px;  position:absolute; border-top-left-radius: 0px; border-top-right-radius: 0px; border-top: 0px; min-width:203px !important; top:{{$root.top}}px !important;"
                    >
                        <li ng-repeat="subitem in $root.menuData[0]['children'][$index].children track by $index" role="menuitem" ng-click="status.isopen = false;" style="margin:0px; ">
                            <a ng-href="#/{{findClickthrough(subitem.data.page)}}" 
                            style="margin:0px; padding-top:8px; padding-bottom:8px;">{{subitem.label}}</a>
                        </li>
                    </ul>-->
                </div>

            </li>
            <li id="level-two-{{((subitem.label)).split(' ').join('-').toLowerCase()}}" 
                ng-class="subitem.data.page === $root.pathToUse || $root.activeTabOver === subitem.label ? 'active' :''"
                ng-show="$root.subPathBoolean" 
                ng-mouseover="$root.activeTabOver = subitem.label"  ng-mouseleave="$root.activeTabOver = ''" 
                ng-repeat="subitem in $root.menuData[0]['children'][$root.activeTab].children track by $index"  data-toggle="tab">
               
                  
                    <a  ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                     <i class="fa fa-fw {{subitem.icon_class}} fa-1x" ></i> 
                       <span class="hidden-xs">   {{subitem.label}} </span>
                    </a> 
                 
          
            </li> 
        </ul>

    </div>
    <!-- height:{{$root.topOffSet != $root.defaultOffSet ? ($root.topOffSet - 60):'0'}}px; -->
 
  
 
 
<div class="right-hand-nav" id="righthandsidebar"  
ng-if="$root.user.FriendlyName && $root.user.FriendlyName != undefined" style="z-index:100;"
ng-init="animatePaddingTopSideBar($root.defaultOffSet); sideOpened = false;"
    ng-style="{'margin-left':$root.topOffSet != $root.defaultOffSet ? '-300px':'0px' }"  
    >
             
            <div class=" btn btn-primary  " 
            style="color:#fff !important;padding:1.1em; padding-left:1.3em; padding-right:1.3em; position:absolute; z-index:999; border-radius:0px;  border:none; left:0px;   top:0px;   margin-left:-45px;"  
                ng-style="{'background-color':$root.applicationHeaderColorSecondary }"
                ng-click="sideOpened = !sideOpened; $root.topOffSet = $root.defaultOffSet; $root.topOffSetPageView = ($root.topOffSet); animateSideBar($root.topOffSet, $root.defaultOffSet, sideOpened);" 
                ng-if="$root.topOffSet != $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <div 
                class="  btn btn-primary  " 
                ng-style="{'background-color':$root.applicationHeaderColorSecondary }"
                style="color:#fff !important; position:absolute; padding:1.1em; padding-left:1.3em; padding-right:1.3em; z-index:999; border-radius:0px;  border:none; left:0px; top:0px;  margin-left:-45px;"  
                ng-click="sideOpened != sideOpened; $root.topOffSet = 200;  $root.topOffSetPageView = ($root.topOffSet); animateSideBar($root.topOffSet, $root.defaultOffSet, sideOpened);" 
                ng-if="$root.topOffSet === $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <h4 style="padding-left:10px; color:#fff;">User Settings</h4>

            <div id="filtersubnm2" class="col-md-12 col-xs-12 filter-label" >  
                   
                    <span class="col-md-12 col-xs-12 label   pull-right small-label"  style="border-radius:0px;" >
                        <small class="pull-right"> Year</small>
                    </span> 
                    <tm1-ui-subnm 
                    ng-show="$root.rowDriver != 'Year' && $root.columnDriver != 'Year' "
                    tm1-instance="dev"  
                    ng-if="$root.defaults.year != '' " 
                    tm1-dimension="Year" 
                    tm1-subset="All Years" 
                    tm1-default-element="{{$root.defaults.year}}"  
                    tm1-attribute="Caption_Default" 
                    tm1-select-only="false" 
                    ng-model="$root.selections.year"
                    tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default", "value":data})'
                    ></tm1-ui-subnm>
            </div>   
            <div class="col-lg-12 col-xs-12"> 
             <small class="pull-right" style="color:#fff;"> Region</small><br>
                <tm1-ui-subnm 
                ng-show="$root.rowDriver != 'Region' && $root.columnDriver != 'Region' "
                ng-if="$root.defaults.region != ''"
                tm1-instance="dev" 
                tm1-dimension="Region" 
                tm1-subset="Default" 
                tm1-select-only="false"
                 tm1-default-element="{{$root.defaults.region}}"  
                ng-model="$root.selections.region"
                tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "region", {"tm1Dimension":"Region", "tm1Alias":"Description", "value":data})'
                ></tm1-ui-subnm>
            </div>
            <div class="col-lg-12 col-xs-12">
             <small class="pull-right" style="color:#fff;"> Department</small><br>
                <tm1-ui-subnm 
                ng-show="$root.rowDriver != 'Department' && $root.columnDriver != 'Department' "
                    ng-if="$root.defaults.department != ''"
                    tm1-instance="dev"
                    tm1-default-element="{{$root.defaults.department}}"  
                    tm1-dimension="Department" tm1-subset="Default" tm1-select-only="false" ng-model="$root.selections.department"
                    tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "department", {"tm1Dimension":"Department", "tm1Alias":"Product Category", "value":data})'
                ></tm1-ui-subnm>
            </div>



 </div>
<div  class="col-md-12 col-xs-12 nopadding titleArea" 
    
    ng-style="{'top':(($root.defaultOffSet)+(45))+'px', 'margin-top':'0px'}" 
>
    <h4 style="   width:100%; " 
    class="text-left pull-left">
        {{($root.subPathBoolean ? ($root.selectedsubParentPage):'') | capitalize }}{{$root.pageTitle}}  
        <span class="hidden-xs pull-right text-right" ng-show="$root.topOffSet === $root.defaultOffSet"> 
            

        {{$root.defaults.year}} | 
        <tm1-ui-dbra tm1-instance="dev" tm1-dimension="Region" tm1-element="{{$root.defaults.region}}" tm1-attribute="Description" tm1-read-only="true"></tm1-ui-dbra> | 
        <tm1-ui-dbra tm1-instance="dev" tm1-dimension="Department" tm1-element="{{$root.defaults.department}}" tm1-attribute="Product Category" tm1-read-only="true"></tm1-ui-dbra> 
        
    </span>
    </h4>
</div>
</div>
<style>
  a:hover, a:focus {
    color: #555;
    text-decoration: none !important;
}
</style>
<ul ng-mouseleave = "$root.indexOver = '';  " 
    id="pop-over-body" 
    ng-if="$root.menuData[0]['children'][$root.indexOver].children.length > 0" 
    ng-style="{'top':(($root.defaultOffSet) + (34))+'px !important'}"  class="popOverContainer" >
    <li ng-repeat="subitem in $root.menuData[0]['children'][$root.indexOver].children track by $index" role="menuitem" ng-click="status.isopen = false; $root.indexOver = '';  " style="cursor:pointer; margin:0px; text-decorations:none; padding:0px; padding:1em; border-bottom:thin solid #777; ">
        <a class="listitem" ng-href="#/{{findClickthrough(subitem.data.page)}}" style=" width:100%; margin:0px; padding-top:1em; color:#555; text-decorations:none;">{{subitem.label}} <span style="display:inline-block; float:left; text-align:left; position:absolute; left:0px;   width:100%; height:47px; "></span></a>  
    </li>
</ul>