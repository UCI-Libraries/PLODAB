var Timeline

(function(){
  Timeline = function() {

  var margin = {top: 20, right: 20, bottom: 30, left: 20},
      width = 1100 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var tlx = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var tly = d3.scale.linear()
      .rangeRound([height, 0]);

  var colorQueue = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

  var color = function() {
    var rectFill = colorQueue.shift();
    colorQueue.push(rectFill);
    return rectFill;
  };

  var chart = function(selection) {
    return selection.each(function(data) {

      var maxBooks = d3.max(data, function(d) {
        return Object.keys(d).length;
      });

      var xAxis = d3.svg.axis()
          .scale(tlx)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(tly)
          .orient("left")
          .tickFormat(d3.format(".2s"));

      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return tipTemplate(d);
          });

      var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("fill", "black")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

      // sets the height of each rect on the bar chart, either dynamically, or, in our case, at a fixed height
      data.forEach(function(d) {
        var bookHeight;
        if (maxBooks < 4) {
          bookHeight = 30;
        } else {
          bookHeight = 100/maxBooks;
        }
        var y0 = 0;
        d.books = Object.keys(d).map(function(name) {
          if (name != "year") {
            return {name: d[name], selected: d[name].selected, y0: y0, y1: y0 += bookHeight};
          }
          else {
            // return a null object if iteratinf over the year
            return {name: d[name], selected: "null", y0: y0, y1: y0};
          }
        });
      });

      tlx.domain(data.map(function(d) {
        return d.year; }));

      //sets the upper limit for the domain of the y axis
      tly.domain([0, 100]);

      // appends the year to every other column, for legibility
      xAxis.tickValues(data.map( function(d,i)
        {
          if(i % 2 === 0 ) return d.year;
        })
          .filter(function (d)
            { return !!d; } ));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var year = svg.selectAll(".year")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          //  below appends the item to a certain column
          .attr("transform", function(d) { return "translate(" + tlx(d.year) + ",0)"; });

      year.selectAll("rect")
          .data(function(d) {
            return d.books; })
        .enter().append("rect")
          .attr("width", tlx.rangeBand())
          .attr("y", function(d) {
            return tly(d.y1); })
          // abuts each additional stacked item to most recent item in col
          .attr("height", function(d) { return tly(d.y0) - tly(d.y1); })
          .style("fill", function(d) {
            // console.log("settingcolor", d.selected);
            if (d.selected === "true") {
              return "yellow";
            } else {
              return "grey";
            }

          })
          .style("stroke", "white")
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
      });
    };

    tipTemplate = function(d) {
      return "<div class='tip-content'><img class='d3-tip-img' src='lib/images/book.svg'><span style='color:white'>" + d.name.name+ "</span></div>";
    };

    return chart;
  };

})();
