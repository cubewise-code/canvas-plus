(function(){
        var app = angular.module('app');
        app.directive('kpiChart', ['$log','$rootScope', function($log, $rootScope) {
            return {
                templateUrl: 'html/kpi-chart.html',
                scope:{
                    tm1Instance: '@',  
                    colorArray:'=',
                    tm1Elements:'@',
                    cubeName:'@',
                    versionPosition:'=',
                    driver:'=',
                    dimensionName:'@',
                    kpiAttribute:'@'
                   
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.defaults = {  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                    monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                };
                scope.onChartElementClick = function(element){
                    
                    $rootScope.onChartElementClick(element);
                }
                scope.dataView = [];
                scope.elementsToUse = [];
                scope.dimensionToUse = $attributes.dimensionName;
                scope.attributeToUse = $attributes.kpiAttribute;
               
                var myVars = ($attributes.tm1Elements);
                //make array from string of elements by split the string myVars into array of elements via ','
                scope.elementsToUse = myVars.split(',');
                scope.elementArrayToUse = [];
                scope.elementArrayMonths = [];
                scope.versionObjectPosition = '';
                scope.versionObjectAlias= {};
                scope.versionObjectVariance= {};
                    
                for(item in scope.versionPosition){
                    if(item === 'position'){
                        scope.versionObjectPosition = scope.versionPosition[item];

                    }else{
                        if(item === 'alias'){
                            scope.versionObjectAlias = scope.versionPosition[item];
                        }else{
                            if(item === 'elementVariance'){
                                scope.versionObjectVariance = scope.versionPosition[item];
                            }
                        }
                    }
                 
                } 
                scope.$watch(function () {
                    return $attributes.tm1Elements;
                    
                    }, function (newValue, oldValue) { 
                        var myVars = (newValue);
                        scope.elementsToUse = myVars.split(',');
                        scope.kpiFirstMonthValue = [];
                        scope.kpiLastMonthValue = [];
                        scope.kpiTotalYearValue = [];
                        scope.kpiLastYearPercentageValue = [];
                        scope.kpiBudgetPercentageValue = [];
                        scope.kpiChartMonthValues = [];
                        scope.elementArrayToUseMonth = [];

                     for(var bb = 0 ; bb < scope.elementsToUse.length; bb++){
                            if(scope.elementsToUse[bb] === 'xAxisMonth'){
                                scope.monthPosition = bb;
                            } 
                     }
                        for(var t = 0 ; t < scope.elementsToUse.length; t++){
                            if(t === scope.versionObjectPosition){
                                if(scope.elementsToUse[t] === scope.versionObjectAlias['Actual']){
                                    scope.versionName = 'Actual'
                                }else{
                                    if(scope.elementsToUse[t] === scope.versionObjectAlias['Budget']){
                                        scope.versionName = 'Budget'
                                    }else{
                                        if(scope.elementsToUse[t] === scope.versionObjectAlias['Last Year']){
                                        scope.versionName = 'Last Year'
                                        }
                                        
                                    } 
                                } 
                            }
                            if(t === scope.monthPosition){
                                scope.kpiChartMonthValues.push('*');
                                scope.kpiBudgetPercentageValue.push('Year');
                                scope.kpiLastYearPercentageValue.push("Year");
                                scope.kpiTotalYearValue.push("Year");
                                scope.kpiLastMonthValue.push("12");
                                scope.kpiFirstMonthValue.push("01");

                                
                            }else{
                                if(t === scope.versionObjectPosition){
                                    

                                    scope.kpiLastYearPercentageValue.push(scope.versionObjectVariance['Last Year']);
                                    scope.kpiBudgetPercentageValue.push(scope.versionObjectVariance['Budget']);
                                }else{
                                    scope.kpiLastYearPercentageValue.push(scope.elementsToUse[t]);
                                    scope.kpiBudgetPercentageValue.push(scope.elementsToUse[t]);
                                }
                                
                                scope.kpiTotalYearValue.push(scope.elementsToUse[t]);
                                scope.kpiChartMonthValues.push(scope.elementsToUse[t]);
                                scope.kpiLastMonthValue.push(scope.elementsToUse[t]);
                                scope.kpiFirstMonthValue.push(scope.elementsToUse[t]);
                            }
                            
                            
                            
                            
                        }

                    
                        scope.elementArrayToUse[0] = (scope.kpiFirstMonthValue).toString();
                        scope.elementArrayToUse[1] = (scope.kpiLastMonthValue).toString();
                        scope.elementArrayToUse[2] = (scope.kpiTotalYearValue).toString();
                        scope.elementArrayToUse[3] = (scope.kpiLastYearPercentageValue).toString();
                        scope.elementArrayToUse[4] = (scope.kpiBudgetPercentageValue).toString();
                        for(v in scope.defaults.monthkey){
                            scope.elementArrayToUseMonth[v] = [];
                            scope.kpiChartMonthValues[scope.monthPosition] = scope.defaults.monthkey[v]; 
                            var yy = ((scope.kpiChartMonthValues).toString()).split("*").join(scope.defaults.monthkey[v]);
                            scope.elementArrayToUseMonth[v] = (yy).toString();
                        }
                          
                        scope.kpiFirstMonthValue = [];
                        scope.kpiLastMonthValue = [];
                        scope.kpiTotalYearValue = [];
                        scope.kpiLastYearPercentageValue = []; 
                        scope.kpiBudgetPercentageValue = [];      
                        scope.kpiChartMonthValues = [];        
                    })
 
                }
            };
        }]);
        
    app.directive('myDirective', ['$log','$rootScope', function($log, $rootScope) {
            return {
                link: function(scope, element) {
                    
                scope.$on('resize::resize', function() {
                     
                });
            }
            }
    }]);
})();