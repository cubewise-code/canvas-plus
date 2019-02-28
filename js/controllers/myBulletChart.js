 
        var app = angular.module('app');
        app.directive('myBulletChart', ['$log','$rootScope', '$tm1Ui', '$timeout','$filter', function($log, $rootScope, $tm1Ui, $timeout, $filter) {
            return {
                templateUrl: 'html/myBulletChart.html',
                scope:{
                    tm1Instance: '@',  
                    cubeName:'@', 
                    title:'@',
                    idName:'@',
                    axisOnly:'@',
                    formatPercentage:'@',
                    cellSetGetArrayValOne:'@', 
                    cellSetGetArrayValTwo:'@', 
                    cellSetGetArrayValThree:'@', 
                    ledgend:'@',
                    driver:'@'
                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    
                    scope.defaults = {  
                        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                        monthkey: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                        

                };
                scope.onChartElementClick = function(element){
                    
                    $rootScope.onChartElementClick(element);
                }
                //scope.dataView = [];
                //scope.elementsToUse = [];
                //scope.dimensionToUse = $attributes.dimensionName;
                //scope.attributeToUse = $attributes.kpiAttribute;
               
               
               
               scope.driver = $attributes.driver;
               scope.title = $attributes.title;
               scope.idName = $attributes.idName;
               scope.axisOnly = $attributes.axisOnly;
               scope.ledgend = {},
               scope.ledgend = $attributes.ledgend;
               if($attributes.formatPercentage && $attributes.formatPercentage === true){
                scope.formatPercentage = true;
               }else{
                scope.formatPercentage = false;
               }
               scope.cellSetGetArrayOne= $attributes.cellSetGetArrayValOne;
               scope.cellSetGetArrayTwo= $attributes.cellSetGetArrayValTwo;
               scope.cellSetGetArrayThree= $attributes.cellSetGetArrayValThree;
               

               var tooltip = d3.select("body")
               .append("div")
               .attr("class", "ttip")
               .style("position", "absolute")
               .style("z-index", "10")
               .style("visibility", "hidden")
               .style("background", "#fff")
               .style("box-shadow"," 5px 10px 8px  rgba(0,0,0,0.3)")
               .style("padding", "0px")
               .style("width", "250px")
               .style("color", "#000")
               .text("a simple tooltip"); 
             $rootScope.ArrayToCaptureValues = [];
             scope.getChartValues = function(){ 
                 scope.cellSetGetArrayOne= $attributes.cellSetGetArrayValOne;
               scope.cellSetGetArrayTwo= $attributes.cellSetGetArrayValTwo;
               scope.cellSetGetArrayThree= $attributes.cellSetGetArrayValThree;
               scope.driver = $attributes.driver;
               scope.title = $attributes.title;
               scope.idName = $attributes.idName;
                scope.axisOnly = $attributes.axisOnly;
               if($attributes.formatPercentage && $attributes.formatPercentage ===true){
                scope.formatPercentage = true;
               }else{
                scope.formatPercentage = false;
               }
               
               
                

                    $timeout(
                        
                        function(){

                          
            
                           
                            if(document.getElementById('bulletChartContainerDrop'+scope.idName)){
                              document.getElementById('bulletChartContainerDrop'+scope.idName).innerHTML = '';
                            } 
                          
                            
                   
                      
                   //var combinedValue = Math.round(scope.cellSetGetArrayTwo) + Math.round(scope.cellSetGetArrayOne);
                   
                           scope.dataReadyForChart([
                               {
                               "reverse":true,
                               "title":((scope.title+"")),
                               "subtitle":"",
                               "driver":scope.driver,
                               "ranges":[0],
                               "ledgend":JSON.parse(scope.ledgend),
                               "actuals":[scope.cellSetGetArrayOne],
                               "measures":[scope.cellSetGetArrayTwo],
                               "markers":[scope.cellSetGetArrayThree]
                               } 
                           ]);


                        
                        
                           

                  // });
            })

                
                
            }
        scope.dataReadyForChart = function(json){
              
              // //console.log(json)
        if(document.getElementById('bulletChartContainerDrop'+scope.idName)){
           
            scope.containerWidth = document.getElementById('bulletChartContainerDrop'+scope.idName).getBoundingClientRect().width;
        }else{
            scope.containerWidth = 800;
        } 
          

        scope.exampleData = json;
       
        var margin = {top: 5, right: 0, bottom: 20, left: 70};
        if(scope.idName === '0' || scope.idName === ''){
            console.log("axis load");
            var width = 70  ;
        }else{
            if(scope.idName > 6){ 
                tooltip.style("margin-left", "-270px")
            }
             var width = 70;
        }
        var height = 299 - margin.top - margin.bottom;
        
       var chart = d3.bullet(scope.idName, $rootScope.minValToUse, $rootScope.maxValToUse , scope.axisOnly)
    .orient("bottom")
    .width(width)
    .height(height);
                   
         
        var data = scope.exampleData;
 
         var svg = d3.select("#bulletChartContainerDrop"+scope.idName).selectAll("svg")
             .data(data)
         .enter().append("svg")

              
            .attr("class", "bullet")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + (scope.idName  === '0' || scope.idName  === '' ? (70):-5) + "," + margin.top + ")")
            .call(chart)
            .on("mouseover", function(d){tooltip.html(
                '<h5 class="col-md-12 col-xs-12" style="color:#333; font-weight:600;margin:0px; padding:10px; background-color:lightgrey; border-bottom:thin solid #333;">'+scope.driver+' : '+d['title']+
                  ' </h5> '+''+
                  ' </p> <p class="col-md-12 col-xs-12" style="color:#fff; padding:5px; padding-left:10px; padding-right:10px; border-bottom:1px solid #ccc;  margin:0px;  background-color:'+d.ledgend['1'].color+'"> '+d.ledgend['1'].name+': <span class="pull-right text-right">'+ $filter('number')((Math.round( d['measures'] )), 0) + ' </span>'+
                  ' <p class="col-md-12 col-xs-12" style="  padding:5px; padding-left:10px;  padding-right:10px; border-bottom:1px solid #ccc;  margin:0px;   color:#fff;  background-color:'+d.ledgend['0'].color+'"> '+d.ledgend['0'].name+':  <span class="pull-right text-right">'+ $filter('number')(Math.round( d['actuals'] ), 0)  + '</span>'+ 
                  ' </p> <p class="col-md-12 col-xs-12" style=" font-weight:600; padding:5px; padding-left:10px; padding-right:10px; border-bottom:1px solid #ccc; margin:0px;  color:'+d.ledgend['2'].color+'"> '+d.ledgend['2'].name+': <span class="pull-right text-right">'+  $filter('number')(Math.round( d['markers'] ), 0) + '</span>'+
                  ' </p>');  return tooltip.style("visibility", "visible");})
              .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
              .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
  
  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(" + width + "," + (height) + ")");

//   title.append("text")
//       .attr("class", "title")
//       .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });

  d3.selectAll("button").on("click", function() {
   
  });

      
   }
    function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}
 
       scope.customCurrency =  function(input, symbol, place){
         if(isNaN(input)){
       return input;
         } else {
           var symbol = symbol || '$';
           var place = place === undefined ? true : place;
           var val = input+'';
           val = val.replace(/,/g, "")
           input = "";
           val += '';
           x = val.split('.');
           x1 = x[0];
           x2 = x.length > 1 ? '.' + x[1] : '';

           var rgx = /(\d+)(\d{3})/;

           while (rgx.test(x1)) {
               x1 = x1.replace(rgx, '$1' + ',' + '$2');
           }

       input = x1 + x2;
           if(place === true){
             if(scope.formatPercentage){
                   return input + "%";
             }else{
                 return symbol + input+"K";
               
             }
           } else{
             if(scope.formatPercentage){
                return input + "%";
               }else{
                 return input + symbol+"K";
               }
            
           }
         }
      } 
            
            
                
        $(window).resize(function() { 
            $timeout(
                function(){  
                  
                }
            );
        });
        
         scope.$watch('$root.selections.year', function (newValue, oldValue, scope) {
        
            if(newValue != oldValue){
                $timeout(
                    function(){
                    
                        //console.log('period Changed to watched from inside bulletchart ', newValue);
                        scope.getChartValues();
                        
                    } 
                );
            }
            
            
           
        }); 
         scope.$watch('$root.selections.department', function (newValue, oldValue, scope) {
        
            if(newValue != oldValue){
                $timeout(
                    function(){
                    
                        //console.log('period Changed to watched from inside bulletchart ', newValue);
                        scope.getChartValues();
                    } 
                );
            }
            
            
           
        }); 
         scope.$watch('$root.selections.region', function (newValue, oldValue, scope) {
        
            if(newValue != oldValue){
                $timeout(
                    function(){
                    
                        //console.log('period Changed to watched from inside bulletchart ', newValue);
                        scope.getChartValues();
                    } 
                );
            }
            
            
           
        }); 
         
            $timeout(
                function(){ 
                    scope.getChartValues();
                },1000
            )
         
        }}}]);
        
       
 