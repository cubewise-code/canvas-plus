<!-- This gets appended at the top for each page  -->
  
<div id="page-header"  ng-controller="headerCtrl"  >
<div ng-show='false'>
    <tm1-ui-user ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
</div>
<div id="mininavinternal"></div>
 

   
 
 <div style="position:fixed; top:0px; right:0px; z-index:9; padding:10px; height:auto;"  
 
  
 >       
   
     
            <ul class="nav navbar-top-links-v2 navbar-right  " style="color:#fff !important; background-color:transparent !important;"  >
            
            <li class="dropdown " style="color:#fff !important; background-color:transparent !important;">
            <span id="opened" > <span class="inline-block" style="margin-right:5px;">{{$root.user.FriendlyName}}  </span> <span class="inline-block"><tm1-ui-session></tm1-ui-session></span> </span>
            </li>
            <li class="dropdown hidden-xs hidden-print" style="color:#fff !important; background-color:transparent !important;">
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
             
    </ul>
</div>
  <div>
    <a href="#">
        <img src="images/logo.svg" 
        title="Your Logo Here" 
        style="background-size:contain; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999;" />
    </a>
  </div>

      
<div   
    class="nav"    
    style="vertical-align: bottom !important; transition-property:padding-top; position:relative; z-index:999;  transition-duration: 1s; position:fixed; top:0px; left:0px; width:100%;  z-index:5; padding-top:100%; padding-top:{{$root.user.FriendlyName ? $root.defaultOffSet+'px':'100%'}}; background-color:#06368b;">  
         
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
    <!-- height:{{$root.topOffSet != $root.defaultOffSet ? ($root.topOffSet - 60):'0'}}px; -->
<div class="col-md-12 col-xs-12" 
    style=" height:0px; position:fixed;  top:0px; margin:0px; left:0px;color:#fff; padding:10px; margin-top:50px;z-index:6; transition-property:height;  transition-duration: 1s; overflow:{{$root.topOffSet != $root.defaultOffSet ? 'auto' :'hidden'}};"
>
 
</div>
  
 
 
<div class="right-hand-nav" 
    style="margin-left:{{$root.topOffSet != $root.defaultOffSet ? '-260':'0'}}px;  margin-top:100%; margin-top:{{$root.user.FriendlyName ? ($root.defaultOffSet+48)+'px':'100%'}}" 
    >
             
            <div class=" btn btn-primary  " style="color:#fff !important;padding:1em; padding-left:1.3em; padding-right:1.3em; position:absolute; z-index:999; border-radius:0px;  border:none; left:0px;   top:0px; background-color:#06368b !important; margin-left:-45px;"  
                ng-click="$root.topOffSet = $root.defaultOffSet; $root.topOffSetPageView = ($root.topOffSet);" 
                ng-if="$root.topOffSet != $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <div 
                class="  btn btn-primary  " 
                style="color:#fff !important; position:absolute; padding:1em; padding-left:1.3em; padding-right:1.3em; z-index:999; border-radius:0px;  border:none; left:0px; top:0px; background-color:#06368b !important; margin-left:-45px;"  
                ng-click="$root.topOffSet = 200;  $root.topOffSetPageView = ($root.topOffSet);" 
                ng-if="$root.topOffSet === $root.defaultOffSet"
                >
                    <i class="fa fa-filter"></i>
            </div>
            <h4 style="padding-left:10px; color:#fff;">Critiria</h4>
            <div id="filtersubnm2" class="col-md-12 col-xs-12 filter-label" >  
                   
                    <span class="col-md-12 col-xs-12 label label-info pull-right small-label"  style="border-radius:0px;" >
                        <small> Year</small>
                    </span> 
                    <tm1-ui-subnm 
                    tm1-instance="dev"  
                    ng-if="$root.defaults.year" 
                    tm1-dimension="Year" 
                    tm1-subset="All Years" 
                    tm1-default-element="{{$root.defaults.year}}"  
                    tm1-attribute="Caption_Default" 
                    tm1-select-only="false" 
                    ng-model="filter.year"
                    tm1-change='updateSettings($root.values, $root.defaults, $root.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default", "value":data})'
                    ></tm1-ui-subnm>
            </div>   
 </div>
<div  class="col-md-12 col-xs-12 nopadding" style="color:#555 !important;padding:1em; padding-left:1.3em; padding-right:60px;   transition-property:margin-left, margin-top;  transition-duration: 1s, 1s;  position:fixed; z-index:5; border-radius:0px;  border:none; left:0px;   top:118px; background-color:#fff !important; margin-top:100%; margin-top:{{$root.user.FriendlyName ? '0px':'100%'}}"  
                 
                 
                >
                <h4 class="text-left pull-left">{{($root.subPathBoolean ? ($root.selectedsubParentPage  ):'') | capitalize }}{{$root.pageTitle}} </h4>
                 <span class="pull-right" ng-show="$root.topOffSet === $root.defaultOffSet"> {{$root.defaults.year}} </span>
            </div>
</div>
 