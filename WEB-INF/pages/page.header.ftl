<!-- This gets appended at the top for each page  -->
  
<div id="page-header"  ng-controller="headerCtrl" ng-mousemove="mouseMovedSetXY($event); " >
    <div ng-show='false'>
        <tm1-ui-user  ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
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
                            ng-click=" closeApplication($root.showView)" >
                                <i class="fa fa-user" aria-hidden="true"></i><sup><i class="fa fa-times text-right"  aria-hidden="true"></i></sup>

                            </a> 
                        </span> 
                  <!--  <span class="inline-block" >
                        <tm1-ui-session></tm1-ui-session>
                    </span> -->
                    
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
    ng-style="{'background-color':$root.applicationHeaderColor, 'padding-top':$root.showView && $root.user.FriendlyName ? '69px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}" 
    style=" transition-property:padding-top;  transition-duration: 1s; vertical-align: bottom !important; position:absolute; z-index:999;   position:fixed; top:0px; left:0px; width:100%;    " ng-mouseover="$root.top = 65"   >  
         
     
    <div style="transition-property:padding-top; transition-duration: 1s;  position:fixed; left:0px; top:0px; float:left; z-index:999; padding-top:0px;  ">
        <a href="#">
            <img src="images/logo.svg" 
            title="Your Logo Here" 
            style="background-size:contain; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999;" /> 
        </a>
    </div>
    
    <ul class="navbuttons"   style="vertical-align: bottom !important; margin:0px; padding-left:0px; background-color:transparent  " ng-mouseleave = "status.isopen = false;" >
          <li   ng-click="$root.activeTab = -1;  $root.showView = true; $root.calendarShow  = false; $root.applicationTriggerFindUser();  "   id="home-nav-btn" ng-class="$root.activeTab === -1 || $root.activeTabOver === 'home' ? 'active':''"
            ng-mouseover="$root.activeTabOver = 'home'"  ng-mouseleave="$root.activeTabOver = ''" >
                
                    <a href="#" data-toggle="tab">  
                        <i   class="fa fa-home fa-1x"></i>   
                        <span class="hidden-xs"> Home </span> 
                    </a> 
                
            </li> 
            <li  id="level-one-{{((item.label)).split(' ').join('-').toLowerCase()}}"
                ng-mouseover="$root.activeTabOver = item.label; getLeftMargin('level-one-'+((item.label)).split(' ').join('-').toLowerCase()); "   ng-mouseleave="$root.activeTabOver = ''"
                ng-repeat="item in $root.menuData[0].children track by $index"   
                ng-show="$root.subPathBoolean === false"
                ng-if="item.label "
                ng-class="$root.activeTabOver === item.label  || $root.activeTab === $index ? 'active':''" > 
               
                <div class="btn-group" uib-dropdown dropdown-append-to-body outsideClick is-open="status.isopen"  >
                   
                    <a ng-href="#/{{findClickthrough(item.data.page)}}"  
                     style="padding-bottom:1em;" ng-mouseover = "status.isopen = true; $root.indexOver = $index;  " 
                     ng-click="  $root.indexOver = $index; $root.showView = true; $root.calendarShow  = false; $root.applicationTriggerFindUser();"   >
                            <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>   
                            <span class="hidden-xs"> 
                            {{item.label}}   
                            </span>
                            <span ng-if="$root.menuData[0]['children'][$index].children.length > 0" class="caret"></span>
                    </a>
               
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
       <!-- <div  ng-click="$root.calendarShow  = !$root.calendarShow; $root.runTimeout()"
            ng-style="{'background-color':$root.applicationHeaderColorSecondary, 'top':$root.showView || $root.calendarShow && $root.user.FriendlyName ? '67px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}"     
            class=" pull-right text-center " 
            style="transition-property:top; transition-duration: 1s;  position:fixed; top:67px; padding-top:1em; cursor:pointer;right:0px; color:#fff;z-index:999; width:45px; height:50px;">
        <i class="fa fa-calendar" area-hidden="true"></i>
        </div> -->
         <div  ng-click="$root.showView = false; $root.calendarShow = true; "
            ng-style="{'background-color':$root.applicationHeaderColorSecondary, 'top':$root.showView || $root.calendarShow && $root.user.FriendlyName ? '67px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}"     
            class=" pull-right text-center " 
            style="transition-property:top; transition-duration: 1s;  position:fixed; top:67px; padding-top:1em; cursor:pointer;right:0px; color:#fff;z-index:999; width:45px; height:50px;">
        <i class="fa fa-skull" area-hidden="true"> </i> 
        </div> 
   

    </div>
     
 
  
 
 
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
 <div   ng-if="!$root.showView" > 
    <div class="container" ng-style="{'height':($root.innerHeight/2)}"  >
   
        <div ng-mouseleave="$root.mouseOverBird = false" ng-mouseover="$root.mouseOverBird = true" 
            ng-mousedown="$root.birdsCapturedCount = $root.birdsCapturedCount+1; $root.birdKilledArray[$index] = true;" 
            ng-repeat="bird in $root.defaults.schedule[$root.selections.year] track by $index" 
            ng-init="$root.myrandomAnim[$index] = $root.getRandomArbitrary(8,14);   " 
            class="bird-container " 
            ng-style="{'top':($root.myrandomAnim[$index])+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myrandomAnim[$index]))+'s'}"   >
                
                <div ng-init="$root.myRRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                    ng-show="!$root.birdKilledArray[$index]"   id="bird{{$index}}" class="bird " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRRandomAnim[$index]))+'s'}">
                </div>
        </div>
      
        
        <div ng-style="{'background-color':$root.applicationHeaderColorSecondary, 'top':$root.showView || $root.calendarShow && $root.user.FriendlyName ? '67px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}"     
            class=" pull-right text-center "
            ng-click="$root.showView = true; $root.calendarShow = false;" 
            style="transition-property:top; transition-duration: 1s; color:#fff; position:fixed; top:67px; padding-top:1em; cursor:pointer;right:0px; color:#fff;z-index:999; width:50px; height:50px;">
            <i class="fa fa-skull" area-hidden="true"> </i> 
            <!-- {{$root.birdsCapturedCount}} -->
        </div>

          <div  
    ng-style="{'height':(($root.innerHeight)-140)+'px', 'opacity':$root.calendarShow ? '1':'0'}" 
    style="opacity:0; position:fixed;left:0px; padding:15px;  color:#fff; transition-property:opacity; transition-delay:2s; top:67px; transition-duration: 1s;  width:100%;   overflow:auto; " 
    >
    
    <div style="position:absolute; top:50%; vertical-align:top; left:0px; width:100%;">
 
        
        <div class="container-cards">
            <div class="row">
            <div  class="col-md-12 col-xs-12" style="pointer-events:auto;padding:0px;  position:absolute; left:0px; top:0px;" >
                
                    <div class="col-lg-2 col-md-2 col-xs-12" 
                    ng-if="!loading" 
                    ng-repeat="card in defaults.schedule[$root.selections.year] track by $index" 
                        ng-style="{'background-color':$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ? 'green':($root.daysRemainingValue[card.key] <= 5 && $root.daysRemainingValue[card.key] > 0 ? '#224160':($root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] < 0 ? '#999':$root.defaults.appColor)), 'color':$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ? '#fff':'#fff'}"
                        ng-click=" $root.openModal(card)   "
                        style="padding:10px; border:none; border-left:1px solid #fff; min-height:170px; height:170px; overflow:auto; overflow:hidden; border-bottom:1px solid #fff;" 
                        ng-init="$root.daysRemaining(card.dateStart, card.key); $root.daysRemaining(card.dateEnd, (card.key+'end')); " >  
                                <div style="position:absolute; left:0px; top:0px; margin-left:0px; width:50px; padding:10px;">
                                    <i class="fa {{card.icon}} fa-2x" aria-hidden="true"></i>
                            
                                
                                </div>
                                <div style="position:absolute; left:0px; top:0px; margin-left:50px; padding-top:15px; width:calc(100%-50px)">

                                    <strong style="font-size:1.2em; line-height:1.3em;  padding-right:10px;">{{card.key}}</strong>
                                
                                </div>
                            
                            
                                <p style="margin-top:60px;"> 		
                                    
                                        <span ng-show="$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] > 0">
                                        {{$root.daysRemainingValue[(card.key+'end')] > 0 ? 'Ends in ':'Finised '}}{{$root.daysRemainingValue[(card.key+'end')] +' days'}} <i  
                                    class="fa fa-exclamation-circle blink"></i> <br/>
                                    </span>
                                    <span ng-show="$root.daysRemainingValue[card.key] > 0 && $root.daysRemainingValue[card.key] < 5 ">
                                        Starts in {{$root.daysRemainingValue[(card.key)] +' days'}} <i  1
                                        class="fa fa-exclamation-circle blink"></i><br/>
                                    </span>
                                    
                                    
                                
                                        
                                Start Date:{{card.dateStart}}<br/>
                                End Date:{{card.dateEnd}}<br>
                                Description: Some text.
                                <!--{{$root.daysRemainingValue[card.key] > 0 ? 'Begins in ':'Started '}}{{$root.daysRemainingValue[card.key]+'days'}}{{$root.daysRemainingValue[card.key] < 0 ? ' ago':''}}</br>
                                {{$root.daysRemainingValue[(card.key+'end')] > 0 ? 'Ends in ':'Finised '}}{{$root.daysRemainingValue[(card.key+'end')] +'days'}}</br>  -->
                                <i ng-if="$root.daysRemainingValue[(card.key)] <= 0 && $root.daysRemainingValue[(card.key+'end')] > 0 " 
                                style="position:absolute; padding-right:10px; padding-left:10px;right:10px; top:calc(45% - 10px); cursor:pointer "	class="fa fa-chevron-right fa-2x text-right pull-right" aria-hidden="true"></i>
                            </p>
                    </div>
                </div>
        

            </div>
        </div>
    </div>




</div>
    </div>
    
         
  
    <div class="targetSVG" ng-show="$root.mouseOverBird" style="position:fixed;  top:0px; left:0px; width:50px; height:50px;" 
        ng-style="{'top':$root.windowclientY-25, 'left':$root.windowclientX-25}">

    </div>
    
    
</div>
