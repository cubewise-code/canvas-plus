d3.bullet = function(index, minVal, maxVal, showAxis) {
    var myindex = index;
  var orient = "left",
      reverse = false,
      vertical = false,
      ranges = bulletRanges,
      markers = bulletMarkers,
      measures = bulletMeasures,
      actuals = bulletActuals,
      width = 300,
      height = 70,
      xAxis = d3.svg.axis();
 
  // For each small multiple…
  function bullet(g) {
    g.each(function(d, i) {
      var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
          markerz = markers.call(this, d, i).slice().sort(d3.descending),
          measurez = measures.call(this, d, i).slice().sort(d3.descending),
          actualz = actuals.call(this, d, i).slice().sort(d3.descending),
          g = d3.select(this),
          extentX,
          extentY;

      var wrap = g.select("g.wrap");
      if (wrap.empty()) wrap = g.append("g").attr("class", "wrap");

      if (vertical) {
        extentX = height, extentY = width;
        wrap.attr("transform", "rotate(90)translate(0," + -width + ")");
      } else {
        extentX = width, extentY = height;
        wrap.attr("transform", null);
      }
      if(minVal < 0){

      }else{
        minVal = 0;
      }
      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain([minVal, maxVal])
          .range(reverse ? [extentX, 0] : [0, extentX]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Derive width-scales from the x-scales.
      var w0 = bulletWidth(x0),
          w1 = bulletWidth(x1);
        //console.log(x0,x1,"WIDTH OF BULLET")
      // Update the range rects.
      var range = wrap.selectAll("rect.range")
          .data(rangez);
      //    console.log("creating s1", i)
   
        
    
      range.enter().append("rect")
          .attr("class", function(d, i) {  return "measure d" + i;  })
          .attr("width", w0)
          .attr("height", extentY)
          .attr("x", reverse ? x0 : 0)
    
      d3.transition(range)
          .attr("x", reverse ? x1 : 0)
          .attr("width", w1)
          .attr("height", extentY);
        
      // Update the measure rects.
      var measure = wrap.selectAll("rect.measure")
          .data(measurez);
      
      measure.enter().append("rect")
          .attr("class", function(d, i) {  return "measure d";  })
          .attr("width", w0)
          .attr("height", function(d, i) { return extentY } )
          .attr("x", x0)
          .attr("y", function(d, i) {   return  '-'+(15 * (i+1))  })
         

      d3.transition(measure)
          .attr("width", w1)
          .attr("height",  function(d, i) { return extentY }  )
          .attr("x", function(d, i) {  if(d < 0){ return x1(0)}else{    return ((300-w1(d))-(300-x1(0)))}  } )
          .attr("y",function(d, i) {   return  '-'+(15 * (i+1))  });
      var actualbar = wrap.selectAll("rect.actual")
          .data(actualz);

       actualbar.enter().append("rect")
          .attr("class", function(d, i) {  return "actual a";  })
          .attr("width", w0)
          .attr("height", function(d, i) { return extentY } )
          .attr("x", x0)
          .attr("y", function(d, i) {   return  '-'+(15 * (i+1))  })
         

      d3.transition(actualbar)
          .attr("width", w1)
          .attr("class", function(d, i) {  return "actual a";  })
          .attr("height",  function(d, i) { return extentY }  )
          .attr("x", function(d, i) {  if(d < 0){ return x1(0)}else{    return ((300-w1(d))-(300-x1(0)))}  } )
          .attr("y",function(d, i) {   return  '-'+(15 * (i+2))  });



       // console.log(measurez, "measures")
      // Update the marker lines.
       
      var marker = wrap.selectAll("line.marker")
          .data(markerz);

      marker.enter().append("line")
          .attr("class", "marker")
          .attr("x1", x0)
          .attr("x2", x0)
          .attr("y1", extentY /9)
          .attr("y2", 70);

      d3.transition(marker)
          .attr("x1", x1)
          .attr("x2", x1)
          .attr("y1", -(extentY / 9))
          .attr("y2", 70);
        // var targetValue = wrap.selectAll("text.targetText")
        //   .data(markerz);
        // targetValue.enter().append("text")
        //   .attr("class", "text")
        //   .attr("x1", x0)
        //   .attr("x2", x0)
        //   .attr("y1", extentY / 6)
        //   .attr("y2", extentY * 5 / 6);
          
          
        //    d3.transition(targetValue)
        //   .attr("width", w1)
        //   .attr("height", extentY / 3)
        //   .attr("x", reverse ? (x1) : 0)
        //   .attr("y", (extentY / 3))
        //    .text(function(d, i) { console.log(this.getAttribute("x")); var sety = this.getAttribute("y"); this.setAttribute("y", (sety)-15 );  var markerVal = markerz[i]; if(markerVal > 999){ markerVal = Math.round(markerVal/1000)+'k' }else{} if(markerVal === 0){}else{ return markerVal;}   });


        // var withInValue = wrap.selectAll("text.chartText")
        //   .data(measurez);
        // withInValue.enter().append("text")
        //   .attr("class", "chartText")
        //   .attr("x", (reverse ? (x0) : 0))
        //   .attr("y", (extentY / 3)-20)
          
          
          
        //    d3.transition(withInValue)
        //   .attr("width", w1)
        //   .attr("height", extentY / 3)
        //   .attr("x", reverse ? (x1) : 0)
        //   .attr("y", (extentY / 3))
        //    .text(function(d, i) { console.log(this.getAttribute("x")); var sety = this.getAttribute("y"); this.setAttribute("y", (sety)-5 );  var measureVal = measurez[i];  if(i === 0){ measureVal =  measurez[0]- measurez[1] }else{ }  if(measureVal > 999){ measureVal = Math.round(measureVal/1000)+'k' }else{} if(measureVal === 0){}else{ return measureVal;}  });


      if(index === '0' || index === '' || !index){
         // console.log("index", index);
           var axis = g.selectAll("g.axis").data([0]);
            axis.enter().append("g").attr("class", "axis");
            axis.attr("transform", vertical ? null : "translate(0," + extentY + ")")
           .call(xAxis.scale(x1));
      }else{
          //console.log("not 0 index", index)
            var axis = g.selectAll("g.axis").data([0]);
            axis.enter().append("g").attr("class", "axis");
             axis.attr("transform", vertical ? null : "translate(0," + extentY + ")")
       //   .call(xAxis.scale(x1));
      }
     
    });
    d3.timer.flush();
  }

  // left, right, top, bottom
  bullet.orient = function(_) {
    if (!arguments.length) return orient;
    orient = _ + "";
    reverse = orient == "right" || orient == "bottom";
    xAxis.orient((vertical = orient == "top" || orient == "bottom") ? "left" : "bottom");
    return bullet;
  };

  // ranges (bad, satisfactory, good)
  bullet.ranges = function(_) {
    if (!arguments.length) return ranges;
    ranges = _;
    return bullet;
  };

  // markers (previous, goal)
  bullet.markers = function(_) {
    if (!arguments.length) return markers;
    markers = _;
    return bullet;
  };

  // measures (actual, forecast)
  bullet.measures = function(_) {
    if (!arguments.length) return measures;
    measures = _;
    return bullet;
  };

  bullet.width = function(_) {
    if (!arguments.length) return width;
    width = +_;
    return bullet;
  };

  bullet.height = function(_) {
    if (!arguments.length) return height;
    height = +_;
    return bullet;
  };

  return d3.rebind(bullet, xAxis, "tickFormat");
};

function bulletRanges(d) {
  return d.ranges;
}

function bulletMarkers(d) {
  return d.markers;
}

function bulletMeasures(d) {
  return d.measures;
}

function bulletActuals(d) {
  return d.actuals;
}

 

function bulletWidth(x) {
  var x0 = x(0);
  return function(d) {
    return Math.abs(x(d) - x0);
  };
}
