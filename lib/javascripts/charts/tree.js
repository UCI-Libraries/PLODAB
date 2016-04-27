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
    width = 860,
    height = 687;

    var plodabColors = {
      "subjects": "rgb(118,147,181)",
      "techniques": "rgb(78,184,185)",
      "materials": "rgb(115,214,154)",
      "place_of_publication": "rgb(204,231,116)",
      "background_color": "rgb(238,242,245)",
      "text_color": "rgb(238,242,245)"
    };

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isChrome = !!window.chrome && !!window.chrome.webstore;

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
                    .attr("class", "tree-background")
                    .attr("width", width)
                    .attr("height", height)
                    .style("fill", "#555759");

        tree.separation(function separation(a, b) {
                    if (a.parent == b.parent) {
                      if (a.siblingCount && a.siblingCount > 2) {
                        return 0.7;
                      } else {
                        return 1.5;
                      }
                    } else {
                      return 1.7;
                    }
                });

        root.x0 = width ;
        root.y0 = height ;

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        function init() {
          root.children.forEach( function(d) {
            activeNodes.push(d);
          });
          activeNodes.forEach( function(d) {
            manageChartWidth(d, false);
          });
        }

        update(root);
        init();

        d3.select("#body").style("height", "800px").style("fill", "red");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                if (!d.children && d.level === "last") {
                  if (d.siblingCount > 2 && d.siblingOrder % 2 === 0) {
                    d.y = d.depth * 280;
                  } else {
                    d.y = d.depth * 230;
                  }
                } else {
                  if (d.level == "mid") {
                    d.y = d.depth * 310;
                  } else {
                    d.y = d.depth * 230;
                  }
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
                    return "translate(" + (d.x0) + "," + (d.y0)+ ") scale(0.4)";
                  }
                })
                .on("click", function(d) {
                  if (d.level !== "top") {
                    click(d);
                  }
                });

            nodeEnter.append("rect")
                .attr("width", function(d) {
                  return d.width;
                })
                .attr("height", function(d) {
                  return d.height;
                })
                .attr("x", function(d) {
                  if (d.width > 150) {
                    return -250;
                  }
                })
                .attr("y", function(d) {
                  return 25;
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
                .style("fill", function (d) {
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
                    if(isFirefox) {
                      return -250;
                    }
                    return 0;
                  }
                })
                .attr("y", function(d) {
                  return 25;
                })
              .append("xhtml:body")
                .style("font", "12px 'Arial'")
                .style("text-align", "center")
                .style("height", "280px")
                .html(function(d) {
                  if (d.level === "mid") {
                    // TODO: make this a helper function
                    return "<div class='tree-node mid' style='display: table; width: "+ d.width +"px; height: 100px;'><p class='tree-text' style='color:dark grey;display: table-cell; text-align: center; vertical-align: middle;'>" + d.nodeName + "</p></div>";
                  } else if ( d.level === "last") {
                    return "<div class='tree-node last' style='display: table; width: 100px; height: 65px;'><p class='tree-text' style='color:dark grey; display: table-cell; text-align: center; vertical-align: middle;'>" + d.nodeName + "</p></div>";
                  } else {
                    return "<div class='artifact'><div class='tree-image' style=''><img src=" + d.imageURI + "></img></div><div class='artifact-text'><h3>"+ d.nodeName + "</h3><div class='artifact-desc'>"+ d.description+ "</div><p>Date Created: " + d.dateCreated + "</p><p>Agents: " + d.agents + "</p><p><a target='_blank' href="+ d.calisphereURI +">See this artist's book's complete record on Calisphere</a></p></div></div>";
                  }
                })
                  .on("click", function(d) {
                    if (d.level === "last") {
                      var selectedTopic = d.parent.nodeName.toLowerCase().replace(/\s/g, '_');
                      chart.topicClicked.topic = selectedTopic;
                      chart.topicClicked.name = d.nodeName;
                    }
                      chart.lastLevelClicked = d.level;
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
                .style("fill", function (d) {
                  var nodeName = d.nodeName.toLowerCase().replace(/\s/g, '_');
                  var parentName = "";
                  if (d.parent) {
                    parentName = d.parent.nodeName.toLowerCase().replace(/\s/g, '_');
                  }
                  var colorNames = Object.keys(plodabColors);
                  if (colorNames.contains(nodeName)) {
                    if (d.children || d._children) {
                      return plodabColors[nodeName];
                    } else {
                      // node is greyed out if there are no children to show
                      return "grey";
                    }
                  } else if (colorNames.contains(parentName)) {
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
                });
                // .attr("stroke", "grey")
                // .attr("stroke-width", 2);

            nodeExit.select("text");

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d) {
                return d.target.id;
            });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                  .style("fill", "transparent")
                  .style("stroke", "white")
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
                removeActiveNode(d);
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
                manageChartWidth(d, true);
            }
            update(d);
        }

        function removeActiveNode(el) {
          var index = activeNodes.indexOf(el);

          if (index > -1) {
            activeNodes.splice(index, 1);
          }
        }

        function manageChartWidth(d, wasClicked) {
          if (d.level === "mid") {
            if (wasClicked) {
              activeNodes.push(d);
            }
            // count the number of children in the view
            var count = 0;
            activeNodes.forEach( function(d) {
              if (d.children) {
                count += d.children.length;
              }
            });
            if (count * 120 > 900 && activeNodes.length > 1) {
              var popped = activeNodes.shift();
              click(popped);
            }
          }
        }
      });
    };

    chart.topicClicked = {topic: "", name: ""};

    return chart;
  };
})();

// TODO: allow item to be shown if there are no other items clicked, even if it has too many items.
