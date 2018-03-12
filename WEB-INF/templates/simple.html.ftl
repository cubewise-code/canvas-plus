<div ng-controller="${pageNameClean}Ctrl">

  <style>
    .tm1-ui-dbr {
      text-align: right;
    }
    .tm1-ui-dbr input {
      text-align: right;
    }   
    .criteria {
      margin-top: 10px;
    }
    .consol {
      font-weight: bold;
    }
  </style>

  <h1>
    <span style="float: left; width: 50px; "><i ng-if="$root.isLoading"  class="fa fa-cog fa-spin" ></i><i ng-if="!$root.isLoading" class="fa fa-cube"></i></span> ${pageName}
  </h1>
  
  <h3>Criteria</h3>
  
  <div class="row">
  
  <#list view.getTitles() as item>
    <div class="col-md-3 criteria" >
      <div>
          <label>${item.dimension}:</label>
      </div>
    <#if (item.getSubset()?length > 0)>
      <div>
        <tm1-ui-subnm tm1-instance="${instance}" tm1-dimension="${item.getDimension()}" tm1-subset="${item.getSubset()}" tm1-default-element="${item.getSelected()!}" ng-model="selections['${item.getDimension()}']"></tm1-ui-subnm>
      </div>
    <#else>
      <div>
        <select class="form-control" ng-model="selections['${item.getDimension()}']">
          <#list item.getElements() as element>
          <option value="${element.key}">${element.alias}</option>
          </#list>
        </select>
      </div>
    </#if>
    </div>
  </#list>
  
  </div>
  
  <h3>Template</h3> 
  
    <#list view.getColumns() as item>
    <#if (item.getSubset()?length > 0)>
      <tm1-ui-element-list tm1-calculate-top-level="true" tm1-instance="${instance}" tm1-dimension="${item.getDimension()}" tm1-subset="${item.getSubset()}" ng-model="values['${item.getDimension()}']"></tm1-ui-element-list>
    </#if>
    </#list>
  
    <#list view.getRows() as item>
    <#if (item.getSubset()?length > 0)>
      <tm1-ui-element-list tm1-calculate-top-level="true" tm1-instance="${instance}" tm1-dimension="${item.getDimension()}" tm1-subset="${item.getSubset()}" ng-model="lists.rows"></tm1-ui-element-list>
      <#break>
    </#if>
    </#list>
    
    
    <tm1-ui-progress tm1-ui-trigger="selections">
    
      <tm1-ui-progress-pending>
      </tm1-ui-progress-pending>
    
      <tm1-ui-progress-ready>
      
        <table class="table table-striped" >
          <tr>
            <#list view.getRows() as item>
            <th style="min-width: 250px;">${item.getDimension()}</th>
            </#list>
            <#list view.getColumns() as item>
            <#if (item.getSubset()?length > 0)>
              <th ng-repeat="item in values['${item.getDimension()}']" class="text-right">{{item.alias}}</th>
            <#else>
              <#list item.getElements() as element>
              <th class="text-right">${element.alias}</th>
              </#list>
            </#if>
            </#list>
          </tr>
        
          <tr ng-repeat="row in table.data()" ng-class="{'consol': !row.isLeaf}">
            <td><tm1-ui-element-list-item tm1-item="row" tm1-item-display="{{row.alias}}"></tm1-ui-element-list-item></td>
            <#list view.getColumns() as item>
                <td ng-repeat="column in values['${item.getDimension()}']" class="text-right">
                  <tm1-ui-dbr 
                      tm1-instance="${instance}" 
                      tm1-cube="${view.getCube()}" 
                      tm1-elements="${dimensions}" 
                      tm1-data-decimal="0" ></tm1-ui-dbr>
                </td>
            </#list>
  
          </tr>
        </table>
        
        <div>
          <div class="btn-group" role="group" >
            <button type="button" class="btn btn-default" ng-click="table.previous()"><i class="fa fa-angle-left"></i></button>
            <span class="btn btn-default" style="width: 70px;">{{table.page()}} of {{table.pages()}}</span>
            <button type="button" class="btn btn-default" ng-click="table.next()"><i class="fa fa-angle-right"></i></button>
          </div>
          <div class="btn-group pull-right" role="group" >
            <button type="button" class="btn btn-default" ng-class="{'active': table.isPageSize(10)}" ng-click="table.pageSize(10)">10</button>
            <button type="button" class="btn btn-default" ng-class="{'active': table.isPageSize(20)}" ng-click="table.pageSize(20)">20</button>
            <button type="button" class="btn btn-default" ng-class="{'active': table.isPageSize(30)}" ng-click="table.pageSize(30)">30</button>
            <button type="button" class="btn btn-default" ng-class="{'active': table.isPageSize(50)}" ng-click="table.pageSize(50)">50</button>
            <button type="button" class="btn btn-default" ng-class="{'active': table.isPageSize(100)}" ng-click="table.pageSize(100)">100</button>
          </div>
        </div>
    
      </tm1-ui-progress-ready>
    
    </tm1-ui-progress>
  
  </div>
    

</div>