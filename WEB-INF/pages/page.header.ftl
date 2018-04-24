<!-- This gets appended at the top for each page  -->
 <div ng-show='false'>
    <tm1-ui-user ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
</div>
<div id="page-header"  ng-controller="headerCtrl" ng-if="$root.user.FriendlyName"
  
>
<div id="mininavinternal"></div>
 

   
 
 <div style="position:fixed; top:0px; right:0px; z-index:9; padding:10px; height:auto;"  
 
  
 >       
   
     
            <ul class="nav navbar-top-links-v2 navbar-right hidden-print" style="color:#fff !important; background-color:transparent !important;"  >
            <li class="dropdown hidden-xs" style="color:#fff !important; background-color:transparent !important;">
            <span id="opened" > <span class="inline-block" style="margin-right:5px;">{{$root.user.FriendlyName}}  </span> <span class="inline-block"><tm1-ui-session></tm1-ui-session></span> </span>
            </li>
            <li class="dropdown hidden-xs" style="color:#fff !important; background-color:transparent !important;">
                <a class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-share-alt fa-fw"></i>&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
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
            <li class="dropdown hidden-xs" style="color:#fff !important; background-color:transparent !important;"  
                ng-click="$root.topOffSet = $root.defaultOffSet; $root.topOffSetPageView = ($root.topOffSet + 60);" 
                ng-if="$root.topOffSet != $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </li>
            <li 
                class="dropdown hidden-xs" 
                style="color:#fff !important; background-color:transparent !important;"  
                ng-click="$root.topOffSet = $root.innerHeight; $root.topOffSetPageView = ($root.topOffSet+60);" 
                ng-if="$root.topOffSet === $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </li>
    </ul>
</div>
  <div class="col-md-12 col-xs-12">

    <a href="#">
        <img src="images/logo.svg" 
        title="Your Logo Here" 
        style="background-size:contain; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999;" />
    </a>
   <span class="inline-block" style="z-index:999; color:#fff; ">{{$root.selections.year}}</span>
  </div>
 
      <div class="col-md-12 col-xs-12 nopadding" ng-show="$root.topOffSet != $root.defaultOffSet "
    style=" height:{{$root.topOffSet != $root.defaultOffSet ? ($root.topOffSet - 60):'0'}}px; position:fixed;  top:0px; margin:0px; left:0px;color:#fff; padding:0px; margin-top:50px;z-index:6; transition-property:height;  transition-delay: 1s;  transition-duration: 1s; overflow:{{$root.topOffSet != $root.defaultOffSet ? 'auto' :'hidden'}};"
>
         <h4 style="padding-left:20px;">Filters <hr /></h4>

            <div  class="col-md-2 col-xs-2 filter-label" >  
                     
                    <tm1-ui-subnm 
                    tm1-instance="dev"  
                    ng-if="$root.defaults.year" 
                    tm1-dimension="Year" 
                    tm1-subset="All Years" 
                    tm1-default-element="{{$root.defaults.year}}"  
                    tm1-attribute="Caption_Default" 
                    tm1-select-only="false" 
                    ng-model="$root.selections.year"
                    tm1-change='updateSettings($root.values, $root.defaults, $root.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default", "value":data})'
                    ></tm1-ui-subnm>
            </div>   
</div>
<div   
    class="nav"    
    style="vertical-align: bottom !important; transition-property:padding-top; position:relative; z-index:999;  transition-duration: 1s; position:fixed; top:0px; left:0px; width:100%;  z-index:5; padding-top:100%; padding-top:{{$root.user.FriendlyName ? $root.topOffSet+'px':'100%'}}; background-color:#06368b;">  
         
        <ul class="navbuttons" style="vertical-align: bottom !important; margin:0px; background-color:#06368b;" >
            <li ng-click="$root.activeTab = -1;  "   id="home-nav-btn" ng-class="$root.activeTab === -1  ? 'active':''">
                
                    <a href="#" data-toggle="tab"  > 
                        <i ng-if="$root.activeTab === -1" class="fa fa-home fa-1x"></i> 
                        <i ng-if=" $root.activeTab != -1" 
                        class="fa fa-caret-left fa-1x"></i>    <span class="hidden-xs"> {{  $root.activeTab != -1 ? 'Home' : ''}} </span> 
                    </a> 
                
            </li>
            <li   
                 
                ng-repeat="item in $root.menuData[0].children track by $index"  
              
                ng-show=" $root.activeTab === -1 "
                ng-if="item.label "
                 
            > 
                <a   ng-href="#/{{findClickthrough(item.data.page)}}">
                    <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i> 
                   <span class="hidden-xs"> {{item.label}}  </span>
                    
                </a>

            </li>
            <li id="level-two-{{((subitem.label)).split(' ').join('-').toLowerCase()}}" 
                ng-class="subitem.data.page === $root.pathToUse ? 'active' :''"
                ng-show="!$rootScope.subPathBoolean "  
                ng-repeat="subitem in $root.menuData[0]['children'][$root.activeTab].children track by $index"  data-toggle="tab">
               
                  
                    <a  ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                     <i class="fa fa-fw {{subitem.icon_class}} fa-1x" ></i> 
                       <span class="hidden-xs">   {{subitem.label}} </span>
                    </a> 
                 
          
            </li> 
        </ul>

    </div>
 
 
</div>
 