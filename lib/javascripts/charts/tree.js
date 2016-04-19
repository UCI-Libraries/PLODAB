var Tree;

(function(){

  Tree = function() {
    Array.prototype.contains = function(obj) {
      var i = this.length;
      while (i--) {
          if (this[i] === obj) {
              return true;
          }
      }
      return false;
    };

    var margin = {
        top: 20,
        right: 120,
        bottom: 20,
        left: 120
    },
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

    var plodabColors = {
      "subjects": "rgb(118,147,181)",
      "techniques": "rgb(78,184,185)",
      "materials": "rgb(115,214,154)",
      "place_of_publication": "rgb(204,231,116)",
      "background_color": "rgb(238,242,245)",
      "text_color": "rgb(238,242,245)"
    };

    var chart = function(selection) {
      return selection.each(function(data) {
        var i = 0,
            duration = 750,
            rectW = 100,
            rectH = 50,
            root = data,
            activeNodes = [];

        var tree = d3.layout.tree().nodeSize([110, 10]).size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function (d) {
             if (d.width && d.level != "last") {
              return [d.x + d.width / 2, d.y + d.height / 2];
             } else {
              return [d.x + rectW / 2, d.y + rectH / 2];
            }
        });

        var svg = d3.select(this)
                    .append("svg")
                    .attr("width", 1000)
                    .attr("height", 1000);

        tree.separation(function separation(a, b) {
                    return a.parent == b.parent ? 1.5 : 1.6;
                });

        root.x0 = width / 2;
        root.y0 = height / 2;

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach( function(d) { activeNodes.push(d); });
        update(root);

        d3.select("#body").style("height", "800px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                if (d.level == "mid") {
                  d.y = d.depth * 330;
                } else {
                  d.y = d.depth * 250;
                }
            });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });


            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                  if (d.x0 && d.y0){
                    return "translate(" + (d.x0) + "," + (d.y0)+ ") scale(0.1)";
                  }
                })

                .on("click", click);

            nodeEnter.append("rect")
                .attr("width", function(d) {
                  return d.width;
                })
                .attr("height", function(d) {
                  return d.height;
                })
                .attr("x", function(d) {
                  if (d.width > 150) {
                    return -(d.width/2 - 55);
                  }
                })
                .attr("rx", function(d) {
                  if (d.level == "mid") {
                    return d.height;
                  } else {
                    return 1;
                  }
                })
                .attr("ry", function(d) {
                  if (d.level == "mid") {
                    return d.height;
                  } else {
                    return 1;
                  }
                })
                .attr("stroke", "grey")
                .attr("stroke-width", 2)
                .style("fill", function (d) {
                  console.log(d.nodeName);
                  var name = d.nodeName.toLowerCase().replace(/\s/g, '_');
                  var parentName = "";
                  if (d.parent) {
                    parentName = d.parent.nodeName.toLowerCase().replace(/\s/g, '_');
                  }
                  var colorNames = Object.keys(plodabColors);
                  if (colorNames.contains(name)) {
                    return plodabColors[name];
                  } else if (colorNames.contains(parentName)) {
                    // TODO: change color of child nodes here
                    console.log("got this far");
                    return plodabColors[parentName];
                  } else {
                    return "white";
                  }
                })
                .on("click", function(d) {
                  svg.selectAll("path").sort(function (a, b) {
                     // select the parent and sort the paths
                    if (a.id != d.id) {
                      // a is not the hovered element, send "a" to the back
                      return -1;
                    } else {
                      // a is the hovered element, bring "a" to the front
                      return 1;
                    }
                  });
                });

              nodeEnter.append("foreignObject")
                .attr("width", function(d) {
                  return d.width;
                })
                .attr("height", function(d) {
                  return d.height;
                })
                .attr("x", function(d) {
                  if (d.width > 150) {
                    return -(d.width/2 - 55);
                  }
                })
                // .attr("y", function(d) {
                //   if (d.height > 150) {
                //     return -(d.height/2);
                //   }
                // })
              .append("xhtml:body")
                .style("font", "14px 'Helvetica Neue'")
                .style("text-align", "center")
                .html(function(d) {
                  if (d.level === "mid") {
                    // TODO: make this a helper function
                    return "<div class='tree-node' style='display: table; width: "+ d.width +"px; height: 100px;'><p class='tree-text' style='color:dark grey;display: table-cell; text-align: center; vertical-align: middle;'>" + d.nodeName + "</p></div>";
                  } else if ( d.level === "last") {
                    return "<div class='tree-node' style='display: table; width: 100px; height: 50px;'><p class='tree-text' style='color:dark grey; display: table-cell; text-align: center; vertical-align: middle;'>" + d.nodeName + "</p></div>";
                  } else {
                    return "<div class='tree-node' style='display: table; width: "+ d.width +"px; height: 150px;'><div class='tree-text' style='color:grey;display:table-cell; text-align: center; vertical-align: top;width:70%; float:right'><h3 style='padding:5px;margin:0px'>" + d.nodeName + "</h3><p>"+ d.description+ "</p><p> " + d.dateCreated + "</p><p> " + d.collection + "</p><p> " + d.publisher + "</p><p> " + d.typeOfWork + "</p></div><div class='tree-text' style='color:grey; display:table-cell; text-align: center; vertical-align:top; width:28%; border:1px grey solid; height:" + (d.height - 12 )+ "px; float:left; padding:5px; background-color: " + "white" + ";'>"+"IMAGE THUMB"+"</div></div>";
                  }
                });

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
              });



            nodeUpdate.select("rect")
                .attr("width", function(d) {
                  return d.width;
                })
                .attr("height", function(d) {
                  return d.height;
                })
                .attr("class", function(d){
                  return d.level;
                })
                .attr("stroke", "grey")
                .attr("stroke-width", 2)
                .style("fill", function (d) {
                  var nodeName = d.nodeName.toLowerCase().replace(/\s/g, '_');
                  var parentName = "";
                  if (d.parent) {
                    parentName = d.parent.nodeName.toLowerCase().replace(/\s/g, '_');
                  }
                  var colorNames = Object.keys(plodabColors);
                  if (colorNames.contains(nodeName)) {

                    return plodabColors[nodeName];
                  } else if (colorNames.contains(parentName)) {
                    // TODO: change color of child nodes here
                    return plodabColors[parentName];
                  } else {
                    return "white";
                  }
                });


            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                  return "translate(" + (d.x + d.width / 2) + "," + (d.y + d.height / 2) + ")scale(0.1)";
                })
                .remove();

            nodeExit.select("rect")
                .attr("width", function(d) {
                  return d.width;
                })
                .attr("height", function(d) {
                  return d.height;
                })
                .attr("stroke", "grey")
                .attr("stroke-width", 2);

            nodeExit.select("text");

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d) {
                return d.target.id;
            });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                  .style("stroke", "grey")
                  .attr("stroke-width", 1)
                .attr("x", rectW / 2)
                .attr("y", rectH / 2)
                .attr("d", function (d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x + (d.height/2);
                d.y0 = d.y + (d.width/2);
            });


        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                // remove node from active queue here
                removeActiveNode(d);
                d._children = d.children;
                d.children = null;
            } else {
                // check how many child nodes are visible and if that exceeds the width of the frame
                // manageChartWidth(d);
                // console.log('activeNodes', activeNodes);
                d.children = d._children;
                d._children = null;
            }

            //http://stackoverflow.com/questions/19167890/d3-js-tree-layout-collapsing-other-nodes-when-expanding-one

            update(d);
        }

        function removeActiveNode(el) {
          var index = activeNodes.indexOf(el);

          if (index > -1) {
            activeNodes.splice(index, 1);
          }
        }

        function manageChartWidth(d) {

          // TODO: check to see if it's a midlevel node
          activeNodes.push(d);
          // count the number of children in the view
          var count = 0;
          activeNodes.forEach( function(d) {
            if (d.children) {
              count += d.children.length;
            } else {
              console.log("rejects", d.children);
            }
          });
          if (count * rectW > 600) {
            var popped = activeNodes.shift();
              console.log(activeNodes, popped);
              collapse(popped);
          }
        }
      });
    };


    return chart;
  };
})();
