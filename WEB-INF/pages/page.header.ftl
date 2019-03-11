<!-- This gets appended at the top for each page  -->
  
<div id="page-header"  ng-controller="headerCtrl"   >
 
    <div ng-show='false'>
        <tm1-ui-user  ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
    </div>
    <div id="mininavinternal"></div>
 

   
 
    <div ng-init="$root.findIfLoggedIn(); $root.printOpened = false;" 
        style="position:fixed; top:0px; right:0px; z-index:99999; padding:10px; height:auto;" ng-if="$root.user.Name && !$root.userLoggedOut"  >       
    
      
            <ul class="nav navbar-top-links-v2 navbar-right  " style="color:#fff !important; background-color:transparent !important;"  >
            
            <li class="dropdown "  style="color:#fff !important; background-color:transparent !important;" >
                <span id="opened"  > 
                    <span class="inline-block-left" style="margin-right:5px;">
                    
                    {{mouseOverUserClose && !$root.userLoggedOut ? 'Sign Out: '+($root.user.Name)+'': (!$root.userLoggedOut ? 'User: '+$root.user.Name+'' : '')}} </span> 
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
            <li 
                style="color:#fff !important; z-index:99999; background-color:transparent !important;">
                <div style="display:block; z-index:99999; cursor:pointer;" ng-click="showPrint()"   >
                  <i class="fa fa-print fa-fw"></i>&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                </div>
                <div ng-style="{'top':$root.defaultOffSet+'px', 'background-color':$root.applicationHeaderColorSecondary, 'right': !$root.printOpened ? '-300px':'0px'}" 
                      
                     style="width:300px; padding:10px; position:fixed;    width:300px; float:right;  color:#333;  -webkit-transition:right 1s; transition-property:right; ">
                  <div class="paddingtop10"   >                    
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
                      
                      <select ng-init="print.outputType = $root.defaults.printOption" ng-model="print.outputType" class="form-control printdropdown">
                        <option value="pdf">PDF</option>
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                      </select>
                    </span>
                    <#if settings.getPrinterVersion() == "1">
                    <a style="color:#fff !important;"  href="print.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}" target="_blank">
                    <#else>
                    <a style="color:#fff !important;"  href="print-v2.pdf?url={{pageUrlEncoded()}}&orientation={{print.pageOrientation}}&page-size={{print.pageSize}}&output-type={{print.outputType}}" target="_blank">
                    </#if>
                        <i style="color:#fff !important;"  class="fa fa-print fa-fw marginright15"></i> <span translate="PRINT" class="marginright15"></span>
                    </a>
                  </div>
                  <div style="border-color:#fff !important; role="separator" class="divider"></div>
                  <div style="color:#fff !important;">
                      <a style="color:#fff !important;"  href="" ngclipboard data-clipboard-text="{{pageUrl()}}" ngclipboard-success="copySuccess(e);">
                        <i class="fa fa-clipboard fa-fw marginright15"  ></i> <span translate="COPYTOCLIPBOARD"></span>
                        <span class="pull-right">
                          <span ng-if="isCopied" class="label label-default" translate="COPIED"></span>
                        </span>
                      </a>
                  </div>
                </div>                  
            </li>
            

             
    </ul>
     
   
</div>
 
<div   
    class="nav" 
    ng-if="$root.defaults.region && $root.selections.region" 
    id="header" 
    ng-init="animatePadding($root.defaultOffSet); $root.colortouse = $root.findColorByHr($root.applicationHeaderColor)"  
    ng-style="{'background-image': 'url(images/'+$root.defaults.region+'.png)','background-color':$root.applicationHeaderColor, 'padding-top':$root.showView && $root.user.FriendlyName ? '50px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}" 
    style=" -webkit-transition:padding-top 1s; transition-property:padding-top;  -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;   transition-duration: 1s; vertical-align: bottom !important;  z-index:999;   position:fixed; top:0px; left:0px; width:100%;      background-position: center;  " ng-mouseover="$root.top = 65"   > 
    
    <div ng-style="{'background-color':$root.colortouse}" style="pointer-events:none;width:100%; height:100%; display:block; position:absolute; top:0px; left:0px; z-index:-1;">

    </div> 
    
      <div class="cloud-group-container " ng-if="!$root.showView || $root.scheduleShow"  ng-init="$root.myCloudGrouprandomAnim[$index] = $root.getRandomArbitrary(44,55);   " 
        ng-repeat-start="cloudGroup in  ['','','','',''] track by $index"  
        ng-style="{'top':($root.myCloudGrouprandomAnim[$index]/2)+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myCloudGrouprandomAnim[$index]))+'s'}"   >
            <div ng-init="$root.myRCloudGroupRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                      id="cloud{{$index}}" class="cloud-group " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRCloudGroupRandomAnim[$index]))+'s'}">
            </div>
        </div>  
      <div class="cloud-container " ng-if="!$root.showView || $root.scheduleShow"  ng-init="$root.myCloudrandomAnim[$index] = $root.getRandomArbitrary(44,55);   " 
        ng-repeat-end="cloud in  ['','','','','','',''] track by $index"  
        ng-style="{'top':($root.myCloudrandomAnim[$index]/2)+'%','animation-delay':($index+1)+'s', 'animation-duration':(($root.myCloudrandomAnim[$index]))+'s'}"   >
            <div ng-init="$root.myRCloudRandomAnim[$index] = $root.getRandomArbitrary(0.5,1)"  
                      id="cloud{{$index}}" class="cloud " 
                    ng-style="{'animation-delay':($index+1)+'s', 'animation-duration':(($root.myRCloudRandomAnim[$index]))+'s'}">
            </div>
        </div>
    
    <div   style="-webkit-transition:padding-top 1s; transition-property:padding-top; transition-duration: 1s; width:100%; position:fixed; left:0px; top:0px; float:left; z-index:999999; padding-top:0px;  "  >
          
         
        <div style="position:fixed; display:block; top:0px; left:0px; width:100%;">
        <a href="#">
            <img src="images/logo.svg" 
            title="Your Logo Here" 
            style="background-size:contain;display:inline-block; float:left; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999999;" /> 
        </a>
 
        </div>
        
    </div>
     
    <ul class="navbuttons"   
        style="z-index:99999999; vertical-align: bottom !important; margin:0px; padding-left:0px; background-color:transparent  " 
        ng-mouseleave = "status.isopen = false;" >
        <li   ng-click="  $root.showView = false; $root.scheduleShow = false; $root.calendarShow = false;  $root.applicationTriggerFindUser();  "   
            ng-show="!$root.subPathBoolean"
            id="home-nav-btn" ng-class="$root.activeTab === -1 || $root.activeTabOver === 'home' ? 'active':''"
            ng-mouseover="$root.activeTabOver = 'home'"  ng-mouseleave="$root.activeTabOver = ''" >
                
                <a href="#" data-toggle="tab">  
                    <i   class="fa fa-home fa-1x"></i>   
                    <span class="hidden-xs"> Home </span> 
                </a> 
                
            
            </li> 
            <li  ng-show="$root.subPathBoolean" >
                
                <a data-ng-href="{{'#/'+($root.selectedsubParentPage).split(' /')[0]}}"  >  
                    <i class="fa fa-angle-left fa-1x"></i>   
                    <span class="hidden-xs"> Back </span> 
                </a> 
                
            
            </li> 
            <li ng-mouseover="$root.activeTabOver = item.label; getLeftMargin('level-one-'+((item.label)).split(' ').join('-').toLowerCase()); "   ng-mouseleave="$root.activeTabOver = ''"
                ng-repeat="item in $root.menuData[0].children track by $index"   
                ng-show="$root.subPathBoolean && $root.activeTabOver === item.label" 
                ng-if="item.label "
                ng-class="$root.activeTabOver === item.label  || $root.activeTab === $index ? 'active':''" > 
               
      
                
               <div class="btn-group" uib-dropdown dropdown-append-to-body outsideClick is-open="status.isopen"  >
                   
                    <a ng-href="#/{{findClickthrough(item.data.page)}}"  
                     style="padding-bottom:1em;" ng-mouseover = "status.isopen = true; $root.indexOver = $index;  " 
                     ng-click="$root.indexOver = $root.showView ? $index:''; $root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();"   >
                            <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i>   
                            <span class="hidden-xs"> 
                            {{item.label}}   
                            </span>
                            <span ng-if="$root.menuData[0]['children'][$index].children.length > 0" class="caret"></span>
                    </a>
               
                </div>

                
            
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
                     ng-click="$root.indexOver = $root.showView ? $index:''; $root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();"   >
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

                  
                    <a  ng-click="$root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();" ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                     <i class="fa fa-fw {{subitem.icon_class}} fa-1x" ></i> 
                       <span class="hidden-xs">   {{subitem.label}} </span>
                    </a> 
                 
          
            </li> 
            
        </ul>
        
         <!--<div ng-click="  $root.scheduleShow = !$root.scheduleShow;  $root.showView =   $root.activeTab != '-1' && !$root.scheduleShow && !$root.calendarShow ? true : false; $root.calendarShow = false;  "
            ng-style="{'background-color': $root.scheduleShow ? $root.applicationHeaderColorSecondary : '#fff' ,  'color':$root.scheduleShow ?   '#fff': $root.applicationHeaderColorSecondary}"     
            class=" pull-right text-center " 
            style="box-shadow: 5px -5px 10px rgba(0,0,0,0.4) ; -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:50px; padding-top:1em; cursor:pointer;right:0px;  z-index:999; width:45px; height:50px;">
            <i class="fa fa-ellipsis-v" area-hidden="true"> </i> 
        </div> -->

        <div id="calendarBtn" ng-click=" $root.calendarShow = !$root.calendarShow;  $root.scheduleShow = false; $root.showView =  $root.activeTab != '-1' && !$root.calendarShow ? true : false"
            ng-style="{'background-color': $root.calendarShow ? $root.applicationHeaderColorSecondary : '#fff' ,  'color':$root.calendarShow ?   '#fff': $root.applicationHeaderColorSecondary}"     
            class=" pull-right text-center " 
            style="  -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:50px; padding-top:1em; cursor:pointer;right:0px;  z-index:999; width:45px; height:50px;">
        <i   class="fa fa-calendar" area-hidden="true"> </i> 
        </div> 
   

    </div>
     
 
  
 
 
<div class="right-hand-nav" id="righthandsidebar"  
ng-if="$root.user.FriendlyName && $root.user.FriendlyName != undefined" 
style="z-index:9999;"
ng-init="  animatePaddingTopSideBar($root.defaultOffSet); sideOpened = false;"
    ng-style="{'margin-left':$root.topOffSet != $root.defaultOffSet ? '-300px':'0px' }"  
    >
             
            <div id="filterbtn" class=" btn btn-primary  " 
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
                    tm1-on-change='updateSettings($root.values, $root.defaults, $root.selections, "year", {"tm1Dimension":"Year", "tm1Alias":"Caption_Default", "value":data});   '
                    ></tm1-ui-subnm>
            </div>   
            <div class="col-xlg-12 col-xs-12"> 
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
            <div class="col-xlg-12 col-xs-12">
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


 <div class="col-xlg-12 col-xs-12">
<h4 class="text-left" style="margin-bottom:0px; border-bottom:1px solid #fff; color:#fff;">User Preferences</h4>
    <span class="pull-left"  ng-click="$root.nightTime = ! $root.nightTime; $root.colortouse  = $root.nightTime ?  '#000000c9' : 'transparent' " 
        style="color:#fff; display:inline-block; padding-left:0px; padding-top:10px;">
         Dark Mode <i ng-class="{'fa-toggle-on':$root.nightTime === false, 'fa-toggle-off':$root.nightTime === true}" class="fa fa-toggle-on"></i>

    </span>

</div>


 </div>
<div  class="col-md-12 col-xs-12 nopadding titleArea" 
    ng-if="$root.selections.year && $root.selections.region && $root.selections.department"
    ng-style="{'top':(($root.defaultOffSet*2)-5)+'px', 'margin-top':'0px'}" 
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
<ul ng-mouseleave = "$root.indexOver =  ''   " 
    id="pop-over-body" 
    ng-if="$root.showView && $root.menuData[0]['children'][$root.indexOver].children.length > 0" 
    style="top:100px !important; margin-top:0px;"  class="popOverContainer" >
    <li ng-repeat="subitem in $root.menuData[0]['children'][$root.indexOver].children track by $index" role="menuitem" ng-click="status.isopen = false; $root.indexOver = '';  " style="cursor:pointer; margin:0px; text-decorations:none; padding:0px; padding:1em; border-bottom:thin solid #777; ">
        <a class="listitem" ng-href="#/{{findClickthrough(subitem.data.page)}}" style=" width:100%; margin:0px; padding-top:1em; color:#555; text-decorations:none;">{{subitem.label}} 
        <span style="display:inline-block; float:left; text-align:left; position:absolute; left:0px;   width:100%; height:47px; "></span></a>  
    </li>
</ul>
 
 <div ng-if="!$root.showView && $root.selections.year" ng-init="$root.loadcalendarYearIsHere()"> 
    <div ng-mousemove="mouseMovedSetXY($event); "  class="container" 
        ng-style="{'height':($root.innerHeight)-180+'px'}" 
        style="top:120px; pointer-events:none !important;"  >
        
         

        <div  ng-mouseover="$root.mouseOverBird = true" ng-mouseleave="$root.mouseOverBird = false" ng-mouseleave="$root.mouseOverBird = false" ng-mouseover="$root.mouseOverBird = true" 
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
        <div class="targetSVG" ng-show="$root.mouseOverBird" ng-style="{'height':$root.defaultOffSet+'px', 'width':$root.defaultOffSet+'px', 'top':($root.windowclientY-25)+'px', 'left':($root.windowclientX-25)+'px'}" style="position:fixed;  " 
        >

    </div>
        
           



         
 
        <div   
            ng-style="{'top':($root.defaultOffSet*2)+'px','width': (($root.innerWidth - ($root.defaultOffSet)))+'px','height':$root.calendarShow ? (($root.innerHeight)-($root.defaultOffSet*3)-8)+'px':'0px','opacity':$root.calendarShow ? '1':'0' , 'transition-delay':$root.calendarShow ? '1s':'0s'}"   class=" calendar-container "  >	
			
		    <div class=" calendar-header" ng-init="$root.showSchedule = true">
                <h4 ng-style="{'top':($root.defaultOffSet),'width':$root.innerWidth-($root.defaultOffSet),'height':$root.defaultOffSet+'px', 'background-color':$root.applicationHeaderColorSecondary}" 
                    style="position:fixed; padding-top:15px;  left:0px; margin-top:0px; z-index:999; color:#fff;width:100%; padding-right:20px;  ">
                         
                        <span style=" width:100%; padding-left:15px; padding-right:12px;"> {{$root.selections.year}} - Calendar  

                            <span ng-show="$root.selections.dateToSee" ng-click="$root.showSchedule = !$root.showSchedule" 
                                class="pull-right" style="cursor:pointer">
                                   Schedule 
                                    <i ng-class="{'fa-toggle-on':$root.showSchedule === true , 'fa-toggle-off':!$root.showSchedule || $root.showSchedule === false}" class="fa"></i> 
                         
                            </span>
                        </span>
                         
                </h4>
              
               
            <div ng-class="{'col-xs-12 col-md-6 col-xlg-6':$root.scheduleShow && $root.selections.dateToSee , 'col-xs-12 col-md-12 col-xlg-12':!$root.scheduleShow && $root.selections.dateToSee , 'col-xlg-12 col-md-12 col-xs-12':!$root.scheduleShow  && !$root.selections.dateToSee }"
            >
			<div    
             
            ng-class="{'col-xs-12 col-md-12 col-xlg-12': $root.selections.dateToSee , 'col-xlg-2 col-md-2 col-xs-12':!$root.selections.dateToSee }"
             ng-init="$root.getDaysInMonth($index, $root.selections.year); $root.itemDeleted = 0"
             ng-if="!$root.loading"
             ng-hide="$root.selections.dateToSee && $root.calendarMonthSelected != $root.includeZeroForNum($index+1)"
             ng-style="{'top':$root.defaultOffSet+'px'}"
				ng-repeat="month in $root.defaults.months track by $index"  
				style=" z-index:22;  margin:0 auto;    border-radius:0px; min-height:278px;"  >
               
                   <div ng-show="$root.selections.dateToSee  " 
                        style="padding:0px; margin:0px; padding:5px;background-color:orange; ">
                           

                        <h4 style="color:#fff; margin:0px; padding:0px;">
                             
                            <span style=" padding:8px; padding-left:15px;  padding-right:15px;"> 
                               {{$root.calendarDateSelected}}
                            
                           <span ng-show="$root.selections.dateToSee"  class="pull-right" > 
                                <button  class="btn btn-small btn-primary" 
                               style="position: absolute; right: 15px; top: 0px; border-radius: 0px;"
                                ng-click="$root.hasNum = []; $root.selections.dateToSee = false; $root.openEventCreate = false; $root.selections.dateCreateNew = false; $root.loadcalendarYearIsHere()" 
                                 >Back to Full Year</button>
                            </span> 
                            <!--<div   class="pull-right" > 
                                <span style="color:#fff; cursor:pointer;"
                                ng-click="$root.hasNum = []; $root.selections.dateToSee = false; $root.openEventCreate = false; $root.selections.dateCreateNew = false; $root.loadcalendarYearIsHere()" 
                                 >Save | </span>
                            </div>-->
                            
                             </span>
                             
                        </h4>
                        <div ng-show="$root.openEventCreate" class="full-width" style="padding-left:15px; padding-right:15px; color:#fff;">
                         
                        <h4 >Create Event {{'#'+($root.itemDeleted+1)}}</h4>
                          <p  
                            ng-repeat="item in ['1','2','3','4','5','6','7','8','9','10'] track by $index" 
                            ng-show="false">
                                
                                
                                <tm1-ui-dbr  
                                    ng-show="false"
                                    tm1-instance="{{$root.defaults.settingsInstance}}"
                                    tm1-cube="{{$root.defaults.calendarCube}}"
                                    tm1-elements="Actual,{{$root.returnDateInReverse($root.calendarDateSelected)}},{{$root.user.FriendlyName}},Item {{$index+1}},Status"    
                                    ng-model="$root.eventName[$index]"
                                > 
                                </tm1-ui-dbr>
                             
                        </p>
                       
                        
                        <div
                            ng-if="$root.eventName.length && $root.eventName[$index] != null" 
                            ng-show="$root.eventName[$index] === '' && $index > $root.itemDeleted-1 && $index <= $root.itemDeleted "  
                            style="padding-bottom:20px;" 
                            ng-repeat="item in $root.eventName track by $index" >
   
                            
                                 
                                <div ng-repeat="measure in ['Name','Description','icon','Action' ]" style="margin-top:10px;" >
                                    <label>{{measure}}: <i ng-if="measure === 'icon'" class="{{'fa '+itemList[measure][($parent.$index)+1]}}"></i></label>
                                    <tm1-ui-dbr  
                                    
                                    tm1-instance="{{$root.defaults.settingsInstance}}"
                                    tm1-cube="{{$root.defaults.calendarCube}}"
                                    tm1-elements="Actual,{{$root.returnDateInReverse($root.calendarDateSelected)}},{{$root.user.FriendlyName}},Item {{($parent.$index)+1}},{{measure}}"    
                                     ng-model="itemList[measure][($parent.$index)+1]"
                                    > 
                                    </tm1-ui-dbr> 
                                  

                                   
                                </div>
                                 <label>Due Date:</label>
                                    <tm1-ui-dbr  
                                    
                                    tm1-instance="{{$root.defaults.settingsInstance}}"
                                    tm1-cube="{{$root.defaults.calendarCube}}"
                                    tm1-elements="Actual,{{$root.returnDateInReverse($root.calendarDateSelected)}},{{$root.user.FriendlyName}},Item {{($parent.$index)+1}},Due Date"    
                                    tm1-date-option="{format:'yyyy-mm-dd'}"
                                    tm1-default-empty=""
                                    tm1-placeholder="Enter new date"
                                    ng-model="itemList['Due Date'][($parent.$index)+1]"
                                    > 
                                    </tm1-ui-dbr> 
                                  <!-- ng-blur="$root.hasNum = []; $root.openEventCreate = false;  $root.query(true);  " -->
                                 <br>
                                  <button style="width:100%; text-align:center;" class="btn btn-primary" ng-class="{'disabled':itemList['Due Date'][($parent.$index)+1] === ''}" 
                                  ng-click="saveItem(row, ['Actual',$root.returnDateInReverse($root.calendarDateSelected),$root.user.FriendlyName,'Item '+(($parent.$index)+1),'Status'], ['Actual',$root.returnDateInReverse($root.calendarDateSelected),$root.user.FriendlyName,'Item '+(($parent.$index)+1),'Status'])">SAVE</button>
                        </div>
                        
                    </div>
                    </div>
                
                <div class="col-xs-12 col-md-12" style="background-color:rgba(0,0,0,0.4); padding:10px;" 
                ng-style="{'border-top':$root.calendarMonthSelected === $root.includeZeroForNum($index+1) && $root.selections.year == $root.setYear  ? '5px solid orange':'1px solid transparent'}" >
                  
                     
                    <h4 style="color:#fff;" >
                    <strong style="display:inline-block" >
                    {{month}} 
                    
                    </strong>
                    <span class="pull-right" style="display:inline-block">
                        <div ng-if=" $root.selections.dateToSee && $root.calendarMonthSelected === $root.includeZeroForNum($index+1)" style="position:absolute; top:0px; vertical-align:top; right:0px; width:auto;">
                            <div ng-click="$root.openEventCreate = !$root.openEventCreate;  $root.createEvent() " class="btn btn-success" style="  border-radius:0px;">
                            {{$root.openEventCreate ? 'x':'+ Event'}}
                            </div>
                        </div>  
                          
                     </span>
                      
                    </h4>
                    

                    <p   class="text-center" ng-repeat="dayOfTheWeek in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] track by $index"  style="color:#fff; border-radius:0px; display:inline-block; min-width:14%; height:30px; width:14%; max-width:14%; margin:0 auto; border-bottom:1px solid #333;"><small>{{dayOfTheWeek}}</small></p>
                    
				 
				 
                    <div ng-id="days[$index]"  
                        ng-repeat="day in $root.days[$index] track by $index" 
                        class="text-center"  style="border-radius:0px; width:14%; color:#fff; max-width:14%; min-width:14%; padding:0px; display:inline-block;  cursor:pointer"
                        ng-style="{ 'margin-left':$index === 0 ? ((firstDayPosition[$parent.$index].length)*14)+'%':'0px'}"  
                        > 
                        
                        <span ng-repeat="row in $root.table.data() track by $index" >
                            
                            <div 
                            ng-init="$root.hasNum[$root.selections.year][month][day]  = true;" 
                            ng-show="true" 
                                ng-if="day && month && $root.selections.year && (day) === (((row['elements'][0]['name']+'').split('-')[2])-1) && ($parent.$parent.$index) === (((row['elements'][0]['name']+'').split('-')[1])-1) && $root.selections.year === (((row['elements'][0]['name']+'').split('-')[0]))">

                             
                            </div>
                            
                        </span>
                        
                        <div style="padding:0px;"
                            ng-click="$root.showScheduleCard($root.selections.year,month,day,$root.hasNuM[$root.selections.year][month][day] )"
                            ng-style="{'background-color':$index  === ($root.dateNumber-1)  && $parent.$index === $root.monthNow  && $root.selections.year == $root.setYear    ? 'orange':   $root.hasNum[$root.selections.year][month][day] ? $root.applicationHeaderColorSecondary:'rgba(0,0,0,0.4)'}"    >
                            <span ng-style="{'background-color':(($index)+1) === $root.calendarDaySelected && $root.selections.dateCreateNew ? 'rgba(255,255,255,0.2)':'rgba(255,255,255,0)'}" style="width:100%; display:block; height:auto; padding:5px;">
                            {{day+1}}
                            </span> 
                        </div> 
                    </div> 
			    </div> 
		    </div> 
        </div> 
</div>
         <div class="container-cards  col-xlg-12 col-md-12 col-xs-12 "  
                    ng-show="$root.showSchedule"  
                     
                    ng-style="{'top':$root.defaultOffSet+'px', 'margin-bottom':0+'px'}"  
                    style="pointer-events: auto;   display: inline-block; position: relative; left: 0px; top: 50px; margin-bottom: 0px; " 
                   >
  
                    <div 
                        ng-class="{'col-xs-12 col-md-3 col-xlg-3': $root.selections.dateToSee  } " 
                        class="card" 
                         
                        ng-repeat="row in $root.table.data() track by $index"  
                        style="   border:none; color:#fff; min-height:140px !important; background-color:transparent;  vertical-align:top;  border:none;     " 
                        ng-style="{   'cursor':$root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[(row['Period Daily'].key+'end')][row.elements[1].name] >= 0 ? 'pointer':'unset', 'color':$root.daysRemainingValue[row['Period Daily'].key] <= 0 && $root.daysRemainingValue[(row['Period Daily'].key+'end')][row.elements[1].name] >= 0 ? '#fff':'#fff'}"
                        ng-hide="!$root.selections.dateToSee || $root.selections.dateToSee && ( ( ($root.calendarDateSelected+'').split('/')[2])+'-'+(($root.calendarDateSelected+'').split('/')[1])+'-'+($root.calendarFilterDaySelected) ) != (row['elements'][0]['name'])"
                        ng-if="!$root.loading"
                        ng-init="$root.daysRemainingValue[row['Period Daily'].key][row.elements[1].name] = $root.daysRemaining(row.elements[0].name);$root.daysRemainingValue[row['Period Daily'].key+'end'][row.elements[1].name] =  $root.daysRemaining(row.cells[6].value); "
                        >
                        <div 
                        class="col-xs-12 col-md-12 col-xlg-12 text-left"
                        ng-style="{ 'background-color':$root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[(row['Period Daily'].key+'end')][row.elements[1].name] >= 0 ? 'green':($root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 5 && $root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] > 0 ? $root.applicationHeaderColorSecondary:($root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[(row['Period Daily'].key+'end')][row.elements[1].name] < 0 ? 'rgba(0,0,0,0.4)':'rgba(0,0,0,0.4)'))}" 
                        style="  min-height:170px;height: auto;padding: 10px;display: inline-block;background-color: rgba(0, 0, 0, 0.4);">
                        
                            <h5 class="col-xs-12 col-md-12 col-xlg-12 text-left" style="  display:inline-block; float:left; margin:0 auto;">
                                   
                                   <div class="text-left" > {{row.elements[0].name}}
                                   <div class="pull-right" style="cursor:pointer;" ng-show="$root.selections.dateToSee && ( ( ($root.calendarDateSelected+'').split('/')[2])+'-'+(($root.calendarDateSelected+'').split('/')[1])+'-'+($root.calendarFilterDaySelected) ) === row['elements'][0]['name']" > 
                                      <small style="color:#fff;">Delete</small> |  <i ng-click=" $root.deleteEvent(row,row.cells[0].reference())" class="fa fa-times" area-hidden="true"> </i>
                                    </div>  
                                   </div>
                                     
                                   <div  ng-click="$root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[((row['Period Daily'].key)+'end')][(row['elements'][1].name)] >= 0 ?  $root.openModal('p&l') : ''   "
                                    ng-class="{'text-left':$root.selections.dateToSee ,'text-center':!$root.selections.dateToSee || $root.selections.dateToSee === false } " 
                                    class=" " style="width:100%;">
                                    <span class="text-center" style="width:100%;   height:auto;">
                                         <i style="font-size: 4vw;" class="fa {{row['icon'].value}} " aria-hidden="true"></i>
                                    </span>
                                   </div>

                              
                                  
                                    
                                    
                                </h5>
                                <div class="col-xs-12 col-md-12 col-xlg-12"style="  display:inline-block;  margin:0 auto; float:left;">
                                   
                                    
                                    
                                    <div  ng-show="$root.selections.dateToSee && ( ( ($root.calendarDateSelected+'').split('/')[2])+'-'+(($root.calendarDateSelected+'').split('/')[1])+'-'+($root.calendarFilterDaySelected) ) === row['elements'][0]['name']" 
                                                ng-repeat="cell in row.cells track by $index" ng-if="$index > 1"
                                                class="text-left" > 
                                                <span style="padding-right: 10px;"><small>{{cell.key}}</small>: {{cell.value}}</span>
                                    </div> 
                                          <div  ng-click="$root.daysRemainingValue[row['Period Daily'].key][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[((row['Period Daily'].key)+'end')][(row['elements'][1].name)] >= 0 ?  $root.openModal('p&l') : ''   " ng-class="{'text-left':$root.selections.dateToSee ,'text-center':!$root.selections.dateToSee || $root.selections.dateToSee === false  }"  style="width:auto; margin-top:0px;">
                                         
                                        <div style="position: relative; margin-top:10px;  background-color: green; padding: 10px; " 
                                            ng-show="$root.daysRemainingValue[(row['Period Daily'].key)][(row['elements'][1].name)] <= 0 && $root.daysRemainingValue[((row['Period Daily'].key)+'end')][(row['elements'][1].name)] > 0">
                                                 <i  class="fa fa-exclamation-circle blink"></i> {{$root.daysRemainingValue[((row['Period Daily'].key)+'end')][(row['elements'][1].name)] > 0 ? 'Ends in ':'Finised '}}{{$root.daysRemainingValue[((row['Period Daily'].key)+'end')][(row['elements'][1].name)] +' day(s)'}} 
                                                 <br/>
                                        </div>
                                        <div style="position: relative; margin-top:10px;   background-color: orange; padding: 10px;  " 
                                            ng-show="$root.daysRemainingValue[(row['Period Daily'].key)][(row['elements'][1].name)] > 0 && $root.daysRemainingValue[(row['Period Daily'].key)][(row['elements'][1].name)] < 5 ">
                                           <i  class="fa fa-exclamation-circle blink"></i>  Starts in {{$root.daysRemainingValue[((row['Period Daily'].key))][(row['elements'][1].name)] +' day(s)'}}  <br/>
                                        </div>
                                          

                                    </div>
                                </div>
                                </div>
                            </div>
                
                        <div>
                        
                    </div>

             

             
       
                </div>
            </div>

        
    </div>

         
  
    
    
</div>
