<!-- This gets appended at the top for each page  -->
  
<div id="page-header"  ng-controller="headerCtrl"   >
 
    <div ng-show='false'>
        <tm1-ui-user  ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
    </div>
    <div id="mininavinternal"></div>
 

   
 
    <div ng-init="$root.findIfLoggedIn();" style="position:fixed; top:0px; right:0px; z-index:9999; padding:10px; height:auto;" ng-if="$root.user.Name && !$root.userLoggedOut"  >       
    
      
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
    class="nav" id="header" ng-init="animatePadding($root.defaultOffSet); colortouse = $root.findColorByHr($root.applicationHeaderColor)"  
    ng-style="{'background-color':$root.applicationHeaderColor, 'padding-top':$root.showView && $root.user.FriendlyName ? '69px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}" 
    style=" -webkit-transition:padding-top 1s; transition-property:padding-top;     background-image: url(images/clouds.png); background-size: cover,  cover;  background-repeat: x-repeat; transition-duration: 1s; vertical-align: bottom !important;  z-index:999;   position:fixed; top:0px; left:0px; width:100%;    " ng-mouseover="$root.top = 65"   > 
    <div ng-style="{'background-color':colortouse}" style="pointer-events:none;width:100%; height:100%; display:block; position:absolute; top:0px; left:0px; z-index:-1;">

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
        <div ng-click="$root.showView = false;"    style="position:fixed;top:0px;left:0px;cursor: pointer;width:100%;pointer-events: auto;height:67px;background-color:transparent;">

        </div>
        <a href="#">
            <img src="images/logo.svg" 
            title="Your Logo Here" 
            style="background-size:contain; height: 40px; position:relative; left:0px; top:0px;margin-top:5px; margin-left: 10px; z-index:999999;" /> 
        </a>

    </div>
    
    <ul class="navbuttons"   
        style="z-index:99999999; vertical-align: bottom !important; margin:0px; padding-left:0px; background-color:transparent  " 
        ng-mouseleave = "status.isopen = false;" >
        <li   ng-click="  $root.showView = false; $root.scheduleShow = false; $root.calendarShow = false;  $root.applicationTriggerFindUser();  "   
            id="home-nav-btn" ng-class="$root.activeTab === -1 || $root.activeTabOver === 'home' ? 'active':''"
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
                     ng-click="   $root.indexOver = $index; $root.showView = true; $root.calendarShow = false; $root.scheduleShow  = false; $root.applicationTriggerFindUser();"   >
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
        
         <div ng-click="  $root.scheduleShow = !$root.scheduleShow;  $root.showView =   $root.activeTab != '-1' && !$root.scheduleShow && !$root.calendarShow ? true : false; $root.calendarShow = false;  "
            ng-style="{'background-color': $root.scheduleShow ? $root.applicationHeaderColorSecondary : '#fff' ,  'color':$root.scheduleShow ?   '#fff': $root.applicationHeaderColorSecondary}"     
            class=" pull-right text-center " 
            style="box-shadow: 5px -5px 10px rgba(0,0,0,0.3) ; -webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:67px; padding-top:1em; cursor:pointer;right:0px;  z-index:999; width:45px; height:50px;">
        <i class="fa fa-ellipsis-v" area-hidden="true"> </i> 
        </div> 

        <div ng-click=" $root.calendarShow = !$root.calendarShow;  $root.scheduleShow = false; $root.showView =  $root.activeTab != '-1' && !$root.calendarShow ? true : false"
            ng-style="{'background-color': $root.calendarShow ? $root.applicationHeaderColorSecondary : '#fff' ,  'color':$root.calendarShow ?   '#fff': $root.applicationHeaderColorSecondary}"     
            class=" pull-right text-center " 
            style="box-shadow: 5px -5px 10px rgba(0,0,0,0.3) ;-webkit-transition:top 1s; transition-property:top; transition-duration: 1s;    position:fixed; top:67px; padding-top:1em; cursor:pointer;right:50px;  z-index:999; width:45px; height:50px;">
        <i   class="fa fa-calendar" area-hidden="true"> </i> 
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
 <div ng-if="!$root.showView"> 
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
        <div class="targetSVG" ng-show="$root.mouseOverBird" style="position:fixed;  top:0px; left:0px; width:50px; height:50px;" 
        ng-style="{'top':$root.windowclientY-25, 'left':$root.windowclientX-25}">

    </div>
        
          <!-- <div ng-style="{'background-color':$root.applicationHeaderColorSecondary, 'top':$root.showView || $root.scheduleShow && $root.user.FriendlyName ? '67px': (!$root.showView && $root.user.FriendlyName ? ($root.innerHeight - 50)+'px':'100%')}"     
            class=" pull-right text-center "
            ng-click="$root.showView = true; $root.scheduleShow = false;" 
            style="-webkit-transition:top 1s; transition-property:top; transition-duration: 1s; color:#fff; position:fixed; top:67px; padding-top:1em; cursor:pointer;right:0px; color:#fff;z-index:999; width:50px; height:50px;">
            <i class="fa fa-skull" area-hidden="true"> </i> 
           {{$root.birdsCapturedCount}}  
        </div>-->



         

        <div   ng-style="{'height':$root.calendarShow ? (($root.innerHeight)-200)+'px':'0px','opacity':$root.calendarShow ? '1':'0' , 'transition-delay':$root.calendarShow ? '2s':'0s'}"    style="position:fixed; top:130px; padding:0px; margin-left:10px; left:0px; width:99%; overflow:auto;   background-color:rgba(0,0,0,0); opacity:0;  transition-property:height, opacity; -webkit-transition:height 1s, opacity 1s; pointer-events:auto !important; "  >	
			
		 
					 
			<div    
            class="col-lg-2 col-md-3 col-xs-12" 
             ng-init="$root.getDaysInMonth($index, $root.selections.year)"

				ng-repeat="month in $root.defaults.months track by $index"  
				style=" z-index:22; top:50px; margin:0 auto;    border-radius:0px; min-height:250px;"  >
                <div class="col-xs-12 col-md-12" style="background-color:rgba(0,0,0,0.3)">
                    <h4 ng-style="{'color':month === $root.currentMonth   && $root.selections.year == $root.setYear  ? 'steelblue':'#fff'}"><strong  >{{month}}</strong></h4>
                    
                    <p   class="text-center" ng-repeat="dayOfTheWeek in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] track by $index"  style="color:#fff; border-radius:0px; display:inline-block; min-width:14%; height:30px; width:14%; max-width:14%; margin:0 auto; border-bottom:1px solid #333;"><small>{{dayOfTheWeek}}</small></p>
                    
				 
				 
                    <div ng-id="days[$index]"  
                        ng-repeat="day in $root.days[$index] track by $index" 
                        class="text-center"  style="border-radius:0px; width:14%; color:#fff; max-width:14%; min-width:14%; padding:0px; display:inline-block;  cursor:pointer"
                        ng-style="{ 'margin-left':$index === 0 ? ((firstDayPosition[$parent.$index].length)*14)+'%':'0px'}"  
                        > 
                        
                        <span ng-repeat="item in defaults.schedule[$root.selections.year] track by $index" >
                            <div ng-init="hasNum[day][month][$root.selections.year] = true;" ng-show="false" 
                                ng-if="($parent.$index) === (((item.dateStart).split('/')[0])-1) && ($parent.$parent.$index) === (((item.dateStart).split('/')[1])-1) && $root.selections.year === (((item.dateStart).split('/')[2]))">
                                
                            </div>
                            
                        </span>
                        <div style="padding:5px;"
                            ng-click=" $root.adminAccess ? (hasNum[$index][month][$root.selections.year] ? editEvent(($index+1)+'/'+($parent.$index+1)+'/'+($root.selections.year)):createNewEvent(($index+1)+'/'+($parent.$index+1)+'/'+($root.selections.year))): ( hasNum[$index][month][$root.selections.year] ? seeDetails(($index+1)+'/'+($parent.$index+1)+'/'+($root.selections.year)):'' )"  
                            ng-style="{'background-color':$index  === ($root.dateNumber-1)  && $parent.$index === $root.monthNow  && $root.selections.year == $root.setYear    ? 'orange':   hasNum[$index][month][$root.selections.year] ? $root.defaults.appColor:'rgba(0,0,0,0.3)'}"    >{{day+1}}
                        </div>
                    
                </div> 
			 </div>
				 
				 
		</div>
		 
	</div> 

          <div   ng-style="{'height':$root.scheduleShow ? (($root.innerHeight)-200)+'px':'0px','opacity':$root.scheduleShow ? '1':'0' , 'transition-delay':$root.scheduleShow ? '2s':'0s'}"    style="position:fixed; top:130px; padding:0px; margin-left:10px; left:0px; width:99%; overflow:auto;   background-color:rgba(0,0,0,0); opacity:0;  transition-property:height, opacity; -webkit-transition:height 1s, opacity 1s;  " 
    >
    
    <div style="position:absolute; top:0px; vertical-align:top; left:0px; width:100%;">
 
        
        <div class="container-cards">
            <div  >
               
            <div   
                    style="pointer-events:auto; padding:10px;  position:absolute; left:0px; top:0px;" >
                
                    <div class="" 
                        ng-if="!loading" 
                        ng-repeat="card in defaults.schedule[$root.selections.year] track by $index" 
                        ng-style="{'cursor':$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ? 'pointer':'unset','width':($root.innerWidth/defaults.schedule[$root.selections.year].length)+'px !important','background-color':$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ? 'green':($root.daysRemainingValue[card.key] <= 5 && $root.daysRemainingValue[card.key] > 0 ? '#224160':($root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] < 0 ? '#999':'rgba(0,0,0,0.3)')), 'color':$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ? '#fff':'#fff'}"
                        ng-click="$root.daysRemainingValue[card.key] <= 0 && $root.daysRemainingValue[(card.key+'end')] >= 0 ?  $root.openModal(card) : ''   "
                        style=" padding:10px; border:none; display:inline-block; border:none min-height:170px; min-width:340px;  height:170px; margin:10px; overflow:auto; overflow:hidden;   " 
                        ng-init="$root.daysRemaining(card.dateStart, card.key); $root.daysRemaining(card.dateEnd, (card.key+'end')); " >  
                                 
                                <h5 >
                                   <i class="fa {{card.icon}} fa-2x" aria-hidden="true"></i>
                                    <strong style="margin-left:10px;">{{card.key}}</strong>
                                
                                </h5>
                            
                            
                                <p style="margin-top:0px;"> 		
                                    
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
