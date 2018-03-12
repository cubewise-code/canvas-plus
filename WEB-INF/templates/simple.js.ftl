app.controller('${pageNameClean}Ctrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {
	/*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {};
    $scope.selections = {};
    $scope.lists = {};
    $scope.values = {};
	   
    // Set default title values
    <#list view.getTitles() as item>
      <#if (item.getSubset()?length == 0)>
    $scope.selections["${item.getDimension()}"] = "${item.getSelected()}";
      </#if>
    </#list>
  
    // Populate the column subsets
    <#list view.getColumns() as item>
      <#if (item.getSubset()?length == 0)>
    $scope.values["${item.getDimension()}"] = [];
        <#list item.getElements() as element>
    $scope.values["${item.getDimension()}"].push({key: "${element.getKey()}", alias: "${element.getAlias()}", level: ${element.getLevel()?c}, index: ${element.index?c}, type: "${element.getType()}", isLeaf: ${element.getLevel()?c} == 0});
        </#list>
      </#if>
    </#list>
  
    // Populate the row subsets
    <#list view.getRows() as item>
      <#if (item.getSubset()?length == 0)>
    $scope.lists.rows = [];
        <#list item.getElements() as element>
    $scope.lists.rows.push({key: "${element.getKey()}", alias: "${element.getAlias()}", level: ${element.getLevel()?c}, index: ${element.index?c}, type: "${element.getType()}", isLeaf: ${element.getLevel()?c} == 0});
        </#list>
      </#if>
    </#list>
  
    $scope.table = $tm1Ui.tableCreate($scope, $scope.lists.rows, {preload: false});	
}]);
