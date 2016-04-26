var Timeline;

(function(){
  Timeline = function() {

  var margin = {top: 20, right: 20, bottom: 30, left: 20},
      width = window.innerWidth * 0.88,
      height = 150 - margin.top - margin.bottom;

  var tlx = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var tly = d3.scale.linear()
      .rangeRound([height, 0]);

  var imgArkStore = {
    "ark:/87280/t0qn64nc":	"3e7f91025c3bb908646f21c01a7567d6",
    "ark:/87280/t08g8hmg":	"c4f40edd63f04547ded92a51c7fc83c0",
    "ark:/87280/t06q1v5x":	"1b62ca101108e3efeff51ebe4bc03967",
    "ark:/87280/t03x84kd":	"d556851767e60d9a2bde21660ad9e7c4",
    "ark:/87280/t0h41pb1":	"3be056026ffe30f42b0175d503d92664",
    "ark:/87280/t0jw8bs8":	"c8de33370e1c6d2357fe30dee57c2def",
    "ark:/87280/t0000019":	"04f6e610355af880d00e3d27ae32cc4d",
    "ark:/87280/t04q7rwr":	"00adaa5af2d066d8cea6232431451db4",
    "ark:/87280/t0mw2f2f":	"919265740e2b0d2277b768a4da2c3a1f",
    "ark:/87280/t0h12zx9":	"5c0fac5864f6a2d3b248d4970be0fd61",
    "ark:/87280/t0kw5cxn":	"014fce19224b4e7662c3bfeda77afdf4",
    "ark:/87280/t07h1ggn":	"e1528404fd512c5d793834b68649be49",
    "ark:/87280/t09g5jrv":	"35643e6fc97567ac5d003999e447c7c1",
    "ark:/87280/t0x63jtt":	"32cb737f0c123af7924c2898d52ad6e9",
    "ark:/87280/t03r0qrx":	"3263bb63c9858430f8bd52a96e6622fe",
    "ark:/87280/t0d798b6":	"9575551d5e04f72fa8ac2fe363a8f746",
    "ark:/87280/t0z60kz6":	"b38e44ddb3035ef7f7350a46bab758e2",
    "ark:/87280/t0pn93h0":	"84bf2eab71f32fa8f21fa909dff3c483",
    "ark:/87280/t0rf5rzq":	"de10b9ffe11a9dafe3ad309f00a092a0",
    "ark:/87280/t05q4t1j":	"2a6521a779224b2d92d168c465afef45",
    "ark:/87280/t0td9v7b":	"3c6e298e4622f24fae637848374b00bf",
    "ark:/87280/t0wd3xh3":	"1a3a5713a760f2d0620abb8f49aafaa8",
    "ark:/87280/t0v985zc":	"549ba809cbcafba8f0d95d3497ba5395",
    "ark:/87280/t0w66hpf":	"76403f9a39dbb5686d57f84df3ba3574",
    "ark:/87280/t0c8276c":	"cc244dcc6b7e9c847336306df5fde2f0",
    "ark:/87280/t0rn35sr":	"58498d5dc118a6da893d13096580bd3c",
    "ark:/87280/t0bg2kw7":	"a948e7b7d597051b4f671068e5e5f31d",
    "ark:/87280/t00z715t":	"597bac08745df14c6356cbf92d7d59c7",
    "ark:/87280/t0j1012g":	"45fffff47fa9769d5e155a85cb3be6a1",
    "ark:/87280/t01z4296":	"66eaeac0d6aa29ad3cecc45740037ddb",
    "ark:/87280/t0sf2t3h":	"92e7919b71307cea5f8c597751e51dd7",
    "ark:/87280/t0cc0xm9":	"3ebcb7192b0ad34562f865b9f402e06e",
    "ark:/87280/t0f769gk":	"19662ad7863ffbdda69de5dbfdb3817b",
    "ark:/87280/t0154f0s":	"e9aff3c4fa149356f1a22413ec9a26a7",
    "ark:/87280/t0057cv0":	"0cbdebdfe8f5710c888555ab1da82179",
    "ark:/87280/t0vd6wcq":	"22942337bed42c664d182fa4cd7b3b07",
    "ark:/87280/t07p8w9r":	"42bc5175d5dd1285b904708e4dd6b37d",
    "ark:/87280/t0np22c5":	"c180c423db93def0d0fac0669ba42702",
    "ark:/87280/t0ms3qnq":	"5ba088d3cd0e93f841097eacd502bc36",
    "ark:/87280/t0g44n6n":	"98077ddfa416ce11d48ada332c5f9bec",
    "ark:/87280/t02z13fk":	"92a8aeb110ea606f057dc581a7662372"
  };

  var calisphereUriPath = "https://thumbnails.calisphere.org/clip/100x100/";

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
          .orient("left");

      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return tipTemplate(d);
          });

      var svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("class", "tl-background")
          .style("fill", "white")
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

      // sets the height of each rect on the bar chart, either dynamically, or, in our case, at a fixed height
      data.forEach(function(d) {
        var bookHeight = 16;
        // NOTE: uncomment to have the chart render with a height that's dependant on the number of books in the collection.
        // if (maxBooks < 4) {
        //   bookHeight = 30;
        // } else {
        //   bookHeight = 100/maxBooks;
        // }
        var y0 = 0;
        d.books = Object.keys(d).map(function(name) {
          var imgArk;
          if (imgArkStore[d[name].imageURI] ) {
            imgArk = calisphereUriPath + imgArkStore[d[name].imageURI];
          } else {
            imgArk = "";
          }
          if (name.slice(0,4) === "book" && name != "books") {
            return {
              name: d[name].name,
              key: d[name].key,
              agent: d[name].artist,
              imageURI: imgArk,
              selected: d[name].selected,
              null: false,
              y0: y0,
              y1: y0 += bookHeight};
          }
          else {
            // return a null object if iteratinf over the year
            // if  the y0 and y1 values aren't set to push the object off the page, you'll end up with an :after artifact
            return {
              name: "null",
              selected: false,
              null: true,
              y0: -2000,
              y1: -2000};
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
            if (d.selected === true) {
              return "#D1B051";
            } else {
              return "#555759";
            }

          })
          .style("stroke", "white")
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on('click', function(d) {
            chart.selectedKey = d.key;
          });
      });
    };

    tipTemplate = function(d) {
      if (d.null !== true ) {
        if (d.imageURI) {
          return "<div class='tip-agent' style='color:whitesmoke'>" + d.agent + "</div><div class='tip-content'><img class='d3-tip-img' src=" + d.imageURI + "><span class='tip-title' style='color:whitesmoke'>" + d.name + "</span></div><br>";
        } else {
          return "<div class='tip-agent' style='color:whitesmoke'>" + d.agent + "</div><div class='tip-content'><img class='d3-tip-img' src='lib/images/book.svg'><span class='tip-title' style='color:whitesmoke'>" + d.name + "</span></div><br>";
        }
      } else {
        return "<span class='null'></span>";
      }
    };

    chart.selectedKey = "";

    return chart;
  };

})();
