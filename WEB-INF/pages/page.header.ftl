<!-- This gets appended at the top for each page  -->
<div id="page-header"  ng-controller="headerCtrl"  >
<div id="mininavinternal"></div>
 

<div   
    class="nav"    
    style="vertical-align: bottom !important; position:fixed; top:0px; left:0px; width:100%;  z-index:5; padding-top:50px; background-color:#06368b;">  
      
        <ul class="navbuttons" style="vertical-align: bottom !important; margin:0px; background-color:#06368b;" >
            <li ng-click="$root.activeTab = -1;  "   id="home-nav-btn" ng-class="$root.activeTab === -1  ? 'active':''">
                <span> 
                    <a href="#" data-toggle="tab"  > 
                        <i ng-if="$root.activeTab === -1" class="fa fa-home fa-1x"></i> 
                        <i ng-if=" $root.activeTab != -1" 
                        class="fa fa-caret-left fa-1x"></i>  {{  $root.activeTab != -1 ? 'Home' : ''}}  
                    </a> 
                </span>
            </li>
            <li   
                id="level-one-{{(item.data.page).split('/')[0]}}"   
                ng-repeat="item in $root.menuData[0].children track by $index"  
                data-toggle="tab"
                ng-show=" $root.activeTab === -1 && !$root.subPathBoolean "
                ng-if="item.label "
                ng-click="$root.activeTab = $index"
            > 
                <a   ng-href="#/{{findClickthrough(item.data.page)}}">
                    <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i> 
                    {{item.label}}  
                    
                </a>

            </li>
            <li id="level-two-{{((subitem.label)).split(' ').join('-').toLowerCase()}}" 
                ng-class="subitem.data.page === $root.pathToUse ? 'active' :''"
                ng-show="!$rootScope.subPathBoolean "  
                ng-repeat="subitem in $root.menuData[0]['children'][$root.activeTab].children track by $index"  data-toggle="tab">
               
                <span>   
                    <a  ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                     <i class="fa fa-fw {{subitem.icon_class}} fa-1x" ></i> 
                        {{subitem.label}} 
                    </a> 
                </span>
          
            </li> 
        </ul>

    </div>


</div>