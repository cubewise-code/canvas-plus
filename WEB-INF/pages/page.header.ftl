<!-- This gets appended at the top for each page  -->
<div id="page-header"  ng-controller="headerCtrl"  >
<div id="mininavinternal"></div>
 <div ng-show='false'>
    <tm1-ui-user ng-hide="true" tm1-instance="dev" ng-model="$root.user"></tm1-ui-user>
</div>
 <div style="position:fixed; top:0px; right:0px; z-index:9; padding:10px;">       
   
    <span id="opened" ><tm1-ui-session></tm1-ui-session> </span>
    
    
</div>

<div   
    class="nav"    
    style="vertical-align: bottom !important; transition-property:padding-top;  transition-duration: 1s; position:fixed; top:0px; left:0px; width:100%;  z-index:5; padding-top:100%; padding-top:{{$root.user.FriendlyName ? '50px':'100%'}}; background-color:#06368b;">  
      
        <ul class="navbuttons" style="vertical-align: bottom !important; margin:0px; background-color:#06368b;" >
            <li ng-click="$root.activeTab = -1;  "   id="home-nav-btn" ng-class="$root.activeTab === -1  ? 'active':''">
                
                    <a href="#" data-toggle="tab"  > 
                        <i ng-if="$root.activeTab === -1" class="fa fa-home fa-1x"></i> 
                        <i ng-if=" $root.activeTab != -1" 
                        class="fa fa-caret-left fa-1x"></i>   <span class="hidden-xs"> {{  $root.activeTab != -1 ? 'Home' : ''}} </span> 
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