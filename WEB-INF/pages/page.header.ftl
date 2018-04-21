<!-- This gets appended at the top for each page  -->
<section id="page-header"  ng-controller="headerCtrl" >
<div id="mininavinternal"></div>

<div  
    id="top-nav"  
    class="nav"    
    style="vertical-align: bottom !important; position:fixed; top:0px; left:0px; width:100%;  z-index:5; padding-top:50px; background-color:#06368b;">  
     
        <ul class="navbuttons" style="vertical-align: bottom !important; margin:0px; background-color:#06368b;" >
            <li ng-click="$root.activeTab = 0;  "   id="home-nav-btn" ng-class="$root.activeTab === 0 ? 'active':''">
                <span> 
                    <a href="#" data-toggle="tab"  > 
                        <i ng-if="$root.activeTab === 0" class="fa fa-home fa-1x"></i> 
                        <i ng-if="$root.activeTab != 0" 
                        class="fa fa-caret-left fa-1x"></i>  
                    </a> 
                </span>
            </li>
            <li   
                id="{{(item.data.page).split('/')[0]}}"   
                ng-repeat="item in $root.menuData[0].children track by $index"  
                data-toggle="tab"
                ng-hide="$root.activeTab  != 0 "
                ng-if="item.label "
            > 
                <a   
                    ng-href="#/{{findClickthrough(item.data.page)}}">
                    <i class="fa fa-fw {{item.icon_class}} fa-1x" ></i> 
                    {{item.label}}  
                    
                </a>

            </li>
            <li id="{{((subitem.label)).split(' ').join('-').toLowerCase()}}" 
                ng-class="subitem.data.page === $root.pathToUse ? 'active' :''"
                ng-if="$root.pathToUse != ''  "  
                ng-repeat="subitem in $root.menuData[0].children[$root.activeTab-1].children track by $index"  data-toggle="tab">
               
                <span>   
                    <a  ng-href="#/{{findClickthrough(subitem.data.page)}}"  href="#">
                        {{subitem.label}} 
                    </a> 
                </span>
          
            </li> 
        </ul>

    </div>


</section>