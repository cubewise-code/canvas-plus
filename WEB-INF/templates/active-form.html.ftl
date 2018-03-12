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
  
  <h3 class="text-muted">Criteria</h3>
  
  <#list view.getTitles() as item>
  <div class="row">
    <div class="col-md-3">     
     ${item.getDimension()}
    </div>
    <div class="col-md-3">
      <#if item.getSubset()?has_content>
        <tm1-ui-subnm tm1-instance="${instance}" tm1-dimension="${item.getDimension()}" tm1-select-only="true" tm1-subset="${item.getSubset()!}" tm1-default-element="${item.getSelected()!}" ng-model="page.titles['${item.getDimension()}']"></tm1-ui-subnm>
      <#else>
        <tm1-ui-subnm tm1-instance="${instance}" tm1-dimension="${item.getDimension()}" tm1-select-only="true" tm1-default-element="${item.getSelected()!}" ng-model="page.titles['${item.getDimension()}']"></tm1-ui-subnm>
      </#if>
    </div>
    <div class="col-md-6">
      
    </div>
  </div>
  </#list>
  
  <div class="row">
    <div class="col-md-3">
      Suppress Zeroes
    </div>
    <div class="col-md-3">
      <select class="form-control" ng-init="page.suppressZero = 'none'" ng-model="page.suppressZero">
        <option value="none">Do not Suppress Zeroes</option>
        <option value="row">Suppress Zero on Rows</option>
      </select>
    </div>
    <div class="col-md-6">
    </div>
  </div>
  
  <h3 class="text-muted">Template</h3> 
  
  <div class="table-responsive" <#if usePaging>ng-init="page.size = 10"</#if>>
    <tm1-ui-rpt-view tm1-instance="${instance}" tm1-cube="${view.getCube()!}" ng-model="data" tm1-suppress-zero="{{page.suppressZero}}" <#if usePaging>tm1-page-size="{{page.size}}"</#if>>
      <tm1-ui-rpt-config>
      <#list view.getTitles() as item>
        <tm1-ui-rpt-title tm1-dimension="${item.getDimension()}" tm1-element="{{page.titles['${item.getDimension()}']}}"></tm1-ui-rpt-title>
      </#list>
          
    <#list view.getRows() as item>
      <#if item.getSubset()?has_content>
        <tm1-ui-rpt-row tm1-dimension="${item.getDimension()}" tm1-subset="${item.getSubset()!}"></tm1-ui-rpt-row>
      <#else>
        <tm1-ui-rpt-row tm1-dimension="${item.getDimension()}" tm1-mdx="${item.getElementMdx()}"></tm1-ui-rpt-row>
      </#if>        
    </#list>
          
    <#list view.getColumns() as item>
      <#if item.getSubset()?has_content>
        <tm1-ui-rpt-column tm1-dimension="${item.getDimension()}" tm1-subset="${item.getSubset()!}"></tm1-ui-rpt-column>
      <#else>
        <tm1-ui-rpt-column tm1-dimension="${item.getDimension()}" tm1-mdx="${item.getElementMdx()}"></tm1-ui-rpt-column>
      </#if>
    </#list>
                    
      </tm1-ui-rpt-config>
      
      <tm1-ui-rpt-template>
        <table id="af1" class="table table-condensed">
          <thead>
            
            <#if useDBRs>
              <tr>
              <#list view.getRows() as item>
                <th>${item.getDimension()}</th>
              </#list>
              
              <#list view.getColumns()[0].getElements() as columnElement>
                <th class="text-center">${columnElement.getAlias()}</th>
              </#list>
              </tr>
              
            <#else>
              
              <#list tableHeaderElements as tableHeaders>
                <tr>              
                  <#if tableHeaders?counter == 1>
                    <#list view.getRows() as item>
                    <th <#if (tableHeaderElements?size > 1)>rowspan="${tableHeaderElements?size}"</#if>>${item.getDimension()}</th>
                    </#list>
                  </#if>
                  
                  <#list tableHeaders as tableElementHeader>
                    <th <#if (tableElementHeader.getRowspan() > 1)>colspan="${tableElementHeader.getRowspan()}"</#if>>${tableElementHeader.getText()}</th>
                  </#list>                
                </tr>                
              </#list>              
            </#if>
            
          </thead>
          <tbody>
            <tr ng-repeat="rowData in data.rows track by $index" <#if usePaging>ng-if="rowData.inPage"</#if>>
            <#list view.getRows() as item>
              <td tm1-ui-rpt-row-element="rowData" tm1-dimension="${item.getDimension()}"></td>
            </#list>
            
          <#list firstRowColumnElements as columnElements>
              <td class="text-right">
            <#if useDBRs>
                <tm1-ui-dbr tm1-rpt-view-model="data" tm1-rpt-row-cell="rowData.getCell('${columnElements}')"></tm1-ui-dbr>
            <#else>              
                <tm1-ui-rpt-row-cell tm1-row-data="rowData" tm1-column-elements="${columnElements}"></tm1-ui-rpt-row-cell>             
            </#if>
              </td>
          </#list>
            
            </tr>
          </tbody>
          </table>
          
          <#if usePaging>
          <div>
            <div class="btn-group" role="group" >
              <button type="button" class="btn btn-default" ng-click="data.pageFirst()"><i class="fa fa-angle-left"></i><i class="fa fa-angle-left"></i></button>
              <button type="button" class="btn btn-default" ng-click="data.pagePrevious()"><i class="fa fa-angle-left"></i></button>
              <span class="btn btn-default" style="width: 70px;">{{data.page()}} of {{data.pages()}}</span>
              <button type="button" class="btn btn-default" ng-click="data.pageNext()"><i class="fa fa-angle-right"></i></button>
              <button type="button" class="btn btn-default" ng-click="data.pageLast()"><i class="fa fa-angle-right"></i><i class="fa fa-angle-right"></i></button>
            </div>
            <div class="btn-group pull-right" role="group">
              <button type="button" class="btn btn-default" ng-class="{'active': data.isPageSize(10)}" ng-click="page.size = 10">10</button>
              <button type="button" class="btn btn-default" ng-class="{'active': data.isPageSize(25)}" ng-click="page.size = 25">25</button>
              <button type="button" class="btn btn-default" ng-class="{'active': data.isPageSize(50)}" ng-click="page.size = 50">50</button>
              <button type="button" class="btn btn-default" ng-class="{'active': data.isPageSize(0)}" ng-click="page.size = 0">All</button>
            </div>
          </div>
          </#if>
      </tm1-ui-rpt-template>
    </tm1-ui-rpt-view> 
  </div>  

</div>