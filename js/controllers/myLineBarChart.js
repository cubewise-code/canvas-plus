(function(){
        var app = angular.module('app');
        app.directive('myLineBarChart', ['$log','$rootScope', '$tm1Ui', '$timeout', function($log, $rootScope, $tm1Ui, $timeout) {
            return {
                templateUrl: 'html/myBulletChart.html',
                scope:{
                    tm1Instance: '@',  
                    cubeName:'@', 
                     title:'@',
                    idName:'@',
                    formatPercentage:'@',
                    cellSetGetArrayActual:'@',
                    elementsToRepeat:'@',
                    cellSetGetArrayBudget:'@',
                    driver:'@'
                    

                }, 
                link:function(scope, $elements, $attributes, directiveCtrl, transclude){
                    scope.cellGetArrayChart = [];
                     
                    scope.defaults = {   };
                 
                
               scope.tm1Instance = $attributes.tm1Instance;
               scope.cubeName = $attributes.cubeName;
               
               scope.title = $attributes.title;
               scope.idName = $attributes.idName;
               scope.formatPercentag = false;
               if($attributes.formatPercentage && $attributes.formatPercentage ===true){
                scope.formatPercentage = true;
               }else{
                scope.formatPercentage = false;
               }
               scope.cellSetGetArrayActual = $attributes.cellSetGetArrayActual;
                scope.elementsToRepeat = $attributes.elementsToRepeat;
               scope.cellSetGetArrayBudget = $attributes.cellSetGetArrayBudget
                scope.loading = false;
                scope.driver = $attributes.driver;
                scope.budval = 0;
                scope.budcount = 0;
                scope.budgetArray = [];
               var tooltip = d3.select("body")
               .append("div")
               .style("position", "absolute")
               .style("z-index", "10")
               .style("visibility", "hidden")
               .style("background", "#fff")
               .style("box-shadow"," 5px 10px 8px rgba(0,0,0,0.3)")
               .style("padding", "0px")
               .style("width", "250px")
               .style("color", "#000")
               .text("a simple tooltip"); 
           
             scope.getChartValues = function(){
                if(document.getElementById(scope.idName)){
                    document.getElementById(scope.idName).innerHTML = '';
                } 
                scope.loading = true;
                //console.log($attributes.tm1Instance, $attributes.cubeName,  scope.cellSetGetArrayActual,  "bulletChart Controller JS");
          

                    $timeout(
                        
                        function(){
                            scope.budgetArray = [];
                             scope.cellGetArrayChart = [];
                            scope.tempArrayAct = [];
                            scope.tempArrayVs = [];
                            scope.tempArrayAgainst = [];
                            scope.budcount = 0;
                            var temp0 = [];
                            var ty = [];
                            var tempo = [] 
                            tempo = scope.cellSetGetArrayActual.split("^");

                            
                            ty = scope.cellSetGetArrayBudget.split("^");
                             
                            for(bbb in ty){
                                scope.budcount++;
                                temp0 = ty[bbb].split(","); 
                                //console.log(ty[bbb], "%%%%%%%%%%% BUD %%%%%%%%%%%")
                                scope.cellGetArrayChart.push({instance:scope.tm1Instance, cube:scope.cubeName, cubeElements:temp0});
                            }
                           
                          
                             
                                for(vad in tempo){
                                var tthh = (tempo[vad]).split(",");
                                

                                    //console.log("############", tthh );
                                    scope.cellGetArrayChart.push({instance:scope.tm1Instance, cube:scope.cubeName, cubeElements:tthh});
                                    
                                }

                                

                              //  scope.tempArrayAct = (scope.cellSetGetArrayActual).split(",");
                              //  scope.tempArrayVs = (scope.cellSetGetArrayVs).split(",");
                              //  scope.tempArrayAgainst = (scope.cellSetGetArrayAgainst).split(",");
                    
                    
                     //scope.cellGetArrayChart.push({instance:scope.tm1Instance, cube:scope.cubeName, cubeElements:scope.tempArrayAct});
                     //scope.cellGetArrayChart.push({instance:scope.tm1Instance, cube:scope.cubeName, cubeElements:scope.tempArrayVs });
                    // //scope.cellGetArrayChart.push({instance:scope.tm1Instance, cube:scope.cubeName, cubeElements:scope.tempArrayAgainst });
                

                
                ///     //console.info('Returned by this function - %o', data);
                   

                 
                  
                   
                     
                    $tm1Ui.cellSetGet(scope.cellGetArrayChart).then(function(data){
                        console.log(data, "data datat datat dta")
                        if(!data.failed){
                             
                           var valuesArrayToUseOne = [];
                           var actualArrayToUse = [];
                           for(valueitem in data){
                               
                            if(valueitem < scope.budcount){
                                console.log(valueitem, scope.budcount, "value item")
                                if(data[valueitem].Value){
                                 
                                    if(scope.formatPercentage){
                                        
                                        
                                        scope.budgetArray.push(  ((data[valueitem].Value)*100)  );
                                    
                                        valuesArrayToUseOne.push(  ((data[valueitem].Value)*100)  );
                                        
                                    
                                    }else{
                                            
                                        
                                        scope.budgetArray.push(  ((data[valueitem].Value))  );
                                    
                                        valuesArrayToUseOne.push(  ((data[valueitem].Value))  );
                                        
                                        
                                    }
                                }else{
                                    scope.budgetArray.push(0);
                                    valuesArrayToUseOne.push( 0 );
                                }
                            }else{

                            
                                if(data[valueitem].Value){
                                   if(scope.formatPercentage){
                                     
                                    actualArrayToUse.push(  ((data[valueitem].Value)*100)  );
                                        valuesArrayToUseOne.push(  ((data[valueitem].Value)*100)  );
                                      
                                      
                                        
                                      
                                   }else{
                                        
                                    actualArrayToUse.push(  ((data[valueitem].Value))  );
                                        valuesArrayToUseOne.push(  (data[valueitem].Value)  );
                                       
                                    
                                   }
                                   //console.log(data[valueitem].Value, "Value to display");
                                   
                               }else{
                                //console.log("no value  to display");
                                   valuesArrayToUseOne.push(0);
                                   actualArrayToUse.push( 0 );
                               // //console.info('Returned by this function - %o', valuesArrayToUse);
                               }
                               
                           }
                        }

                           
                            scope.valueArray = [];
                            scope.min = 0;
                            scope.max = 0;
                            scope.startY = 0;
                       
                            scope.min = minReduce(valuesArrayToUseOne);
                            scope.max = maxReduce(valuesArrayToUseOne);
                            scope.finalArrayToUseTransform = [];
                            scope.addedNum = 0;
                            console.log(scope.min, scope.max, valuesArrayToUseOne,"min and max %%%%%%%%%%%%%%%%%%%");
                            var tmpaaarray = (scope.elementsToRepeat).split(',')
                           for(var tg = 0; tg< tmpaaarray.length; tg++ ){
                            ////console.log('elementsToRepeatelementsToRepeatelementsToRepeatelementsToRepeatelementsToRepeat      ',tmpaaarray[tg]  )
                            
                                var nameToUse = tmpaaarray[tg];
                             if(nameToUse === ''){
                                var nameToUse = 'Current Date';
                             }
                            //console.log(scope.budgetArray[tg], scope.budgetArray, "scope.budgetArray[tg]scope.budgetArray[tg]scope.budgetArray[tg]scope.budgetArray[tg]")
                            scope.finalArrayToUseTransform.push({
                                "categorie": nameToUse,
                                "index":tg,
                                "budget":scope.budgetArray[tg],
                                "values": [
                                    {
                                        "index":tg,
                                        "value": (actualArrayToUse[scope.addedNum]), 
                                        "rate": "Actual"
                                    }, 
                                    {
                                        "index":tg,
                                        "value": (actualArrayToUse[(scope.addedNum+1)]), 
                                        "rate": "Last Year"
                                    } 
                                ]
                            })
                            scope.addedNum+= 2;
                            ////console.log('%%%%%%%%%%%%%%%%%%%%%%', scope.finalArrayToUseTransform)
                           }


                   //////console.log(scope.min, scope.max, valuesArrayToUseOne, "min$$$$$$$$$$$$$$$$");
                    //      ////console.log( valuesArrayToUseOne ,"array from TM1");
                          
 
                          scope.dataReadyForChart(scope.finalArrayToUseTransform)


                        }
                        
                           

                   });
            })

               
            }

                

            

              
           



             
        
        









        scope.dataReadyForChart = function(json){
               // //console.log(json, "json passed api ")
                
        if(document.getElementById(scope.idName)){
            scope.containerWidth = document.getElementById(scope.idName).getBoundingClientRect().width;
        }else{
            scope.containerWidth = 800;
        }
        data=[];
        data = json;
        
            
var margin = {top: 30, right: 20, bottom: 30, left: 40},
width = (document.getElementById(scope.idName).getBoundingClientRect().width) - margin.left - margin.right,
height = 350 - margin.top - margin.bottom;
 
var x0 = d3.scale.ordinal()
.rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear() 
.range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x0)
.tickSize(0)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var color = d3.scale.ordinal()
.range(["steelblue","#adadad"]);
 
var svg = d3.select("#"+scope.idName).append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 
 
var categoriesNames = data.map(function(d) { return d.categorie; });
var rateNames = data[0].values.map(function(d) { return d.rate; });
 
 
 
x0.domain(categoriesNames);
x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()], .3);
if(Math.floor(scope.min) ===  Math.round(scope.max)){
    y.domain([Math.floor(scope.min), Math.round(scope.max)]);
}else{
    y.domain([Math.floor(scope.min), Math.round(scope.max)]);
}
 
 

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(10," + (height+10) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .style('opacity','0')
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .style('font-weight','bold')
  .text("Hold %");

  svg.append("g")
.attr("transform", "translate(0, "+height+")")
.append("line")
.attr("x2", width)
.style("stroke", "black")
.style("z-index", "1")
.style("stroke-width", "1px");

svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
 
           
    if(scope.min <= 0){
        svg.append("g")
            .attr("transform", "translate(0, "+y(0)+")")
            .append("line")
            .attr("x2", width)
            .style("stroke", "black")
            .style("z-index", "1")
            .style("stroke-width", "1px");
    }
    
 
  
 

 
var slice = svg.selectAll(".slice")
  .data(data)
  .enter().append("g")
  .attr("class", "g")
  .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

slice.selectAll("rect")
  .data(function(d) { return d.values; })
.enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("height", function(d) { return 0; })
    .attr("x", function(d) { return x1(d.rate); })
    .attr("y", function(d) { var returnval = '';
        if(d.value < 0 && scope.min < 0 && scope.max < 0  ){
            returnval = 0;
        }else{
            if(d.value >= 0 && scope.min >= 0  && scope.max > 0 ){
                returnval = height;
            }else{
                returnval = y(0);
            }
        }
        
        return returnval })

    .style("cursor", "pointer")
    .style("fill", function(d) { var returnvalk = '';
         
            returnvalk = color(d.rate);
            //console.log(d.index,  data[d.index].values[1].value, "index, value last year");
            if(d.value >= 0 ){
                if(d.value >= data[d.index].values[1].value && d.value < scope.budgetArray[d.index] && d.rate === 'Actual'){
                    returnvalk = "orange";
                }else{
                    if(d.value >= data[d.index].values[1].value && d.value >= scope.budgetArray[d.index] && d.rate === 'Actual'){
                        returnvalk = 'green';
                    }else{
                        if(d.value <= data[d.index].values[1].value && d.value >= scope.budgetArray[d.index] && d.rate === 'Actual'){
                            returnvalk = '#81c341';
                        }
                    }
                     
                }
                
            }else{
                returnvalk = 'red';
            }
         
        return returnvalk })
    .on("click", function(d){  return d.index   })
    .on("mouseover", function(d){ var returnvalk = '';
         
    returnvalk = color(d.rate);
    //console.log(d.index,  data[d.index].values[1].value, "index, value last year");
    if(d.value >= 0 ){
        if(d.value >= data[d.index].values[1].value && d.value < scope.budgetArray[d.index] && d.rate === 'Actual'){
            returnvalk = "orange";
        }else{
            if(d.value >= data[d.index].values[1].value && d.value >= scope.budgetArray[d.index] && d.rate === 'Actual'){
                returnvalk = 'green';
            }else{
                if(d.value <= data[d.index].values[1].value && d.value >= scope.budgetArray[d.index] && d.rate === 'Actual'){
                    returnvalk = '#81c341';
                }
            }
             
        }
        
    }else{
        returnvalk = 'red';
    } tooltip.html(
        '<h5 class="col-md-12 col-xs-12" style="color:#333; padding:10px; margin:0px; padding:0px; background-color:'+returnvalk+';border-bottom:thin solid #333;"><span class="col-md-12 col-xs-12" style="padding:10px;  color:#fff;">'+scope.driver+' : '+data[d.index].categorie+': Hold % </span>'+  
    ' <p class="col-md-12 col-xs-12" style="color:#333; padding:5px; margin:0px; background-color:#fff; padding:10px;"> '+d.rate+'<span class="inlineblock text-right">'+ parseFloat(d.value).toFixed(2) + '%</span>'+
    ' </p>');   return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){  return tooltip.style("visibility", "hidden");   });
slice.append("g")
    .attr("transform", function(d) { console.log(y(scope.budgetArray[d.index])); return "translate("+((x1.rangeBand()/(3))+4)+", "+ y(parseFloat(data[d.index].budget).toFixed(2)) +")"} )
     
    .append("line")
    .attr("x2",  (x1.rangeBand()) )
    .style("stroke", "rgb(201, 220, 239)")
    .style("z-index", "10")
    .style("cursor", "pointer")
    .style("stroke-width", "5px")
    .on("mouseover", function(d){    tooltip.html(
      '<h5 class="col-md-12 col-xs-12" style="color:#333; padding:10px; margin:0px; padding:0px; background-color:lightblue; border-bottom:thin solid #333;"><span class="col-md-12 col-xs-12" style="padding:10px;">'+scope.driver+': Budget </span>'+
      ' <p class="col-md-12 col-xs-12" style="color:#333; padding:5px; margin:0px; background-color:#fff; padding:10px;"> Hold %:<span class="inlineblock text-right">'+ parseFloat(data[d.index].budget).toFixed(2)  + '%</span>'+
      ' </p>');   return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){  return tooltip.style("visibility", "hidden");   });
  
slice.selectAll("rect")
  .transition()
  .delay(function (d) {return Math.random()*1000;})
  .duration(1000)
  .attr("y", function(d) { var returnval = '';
    if(d.value < 0 && scope.min < 0 && scope.max < 0  ){
        returnval = 0;
    }else{
        if(d.value >= 0 && scope.min >= 0  && scope.max > 0 ){
            returnval =  y(d.value);
        }else{
            if(d.value < 0 ){
                returnval = y(0);
            }else{
                returnval = y(d.value);
            }
            
        }
    }
      
    return returnval; })
  .attr("height", function(d) { var returnvalf = '';
    if(d.value < 0 && scope.min < 0 && scope.max < 0  ){
        returnvalf =  y(d.value);
    }else{
         
        if(d.value >= 0 && scope.min >= 0  && scope.max > 0 ){
            returnvalf =   height - y(d.value);
        }else{
            //console.log("NEGATIVE VALUE", d.value, scope.min, scope.max, y(0)," $$$$$$$$$$$$$$" );
             
            if(d.value > 0 ){
                returnvalf =   (y(0)) - y(d.value);
            }else{
                returnvalf =   y(d.value)- y(0);
            }
        }
           
        
    }
    return  returnvalf});

 
 //Legend
 
 
 scope.loading = false;


 
      }
      var minReduce = function (arr) {
        return arr.reduce(function (p, v) {
          return ( p < v ? p : v );
        });
      };
      var maxReduce = function (arr) {
        return arr.reduce(function (p, v) {
          return ( p > v ? p : v );
        });
      };     
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
            
               // var myVars = ($attributes.tm1Elements);
                //make array from string of elements by split the string myVars into array of elements via ','
               // scope.elementsToUse = myVars.split(',');
        
                   
                
        $(window).resize(function() {
            $timeout(
                function(){  
                    //console.log('Date Changed to watched from inside bulletchart ', window.innerWidth, window.innerHeight);
                    if(document.getElementById(scope.idName)){
                        //console.log("building", scope.loading)
                        document.getElementById(scope.idName).innerHTML = '';
                        if(!scope.loading){
                            scope.getChartValues();
                        }
                        
                    } 
                  
                     
                }
            );
        });
       
        scope.$watch('cellSetGetArrayActual', function (newValue, oldValue, scope) {
            //Do anything with $scope.letters
             
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
                },2000
            );
 
             
        }}}]);
        
       
})();