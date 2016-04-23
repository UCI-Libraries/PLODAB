(function() {
  angular.module('plodab')
    .directive('bubbleChart', function() {
      var chart = Bubbles();

      return {
        restrict: 'E',
        scope: {
          bubbleData: '=',
          selectedNodes: '=',
          selectedTopics: '='        },
        link: function(scope, element, attrs) {

          scope.$watch('bubbleData.dataSet', function(newData, oldData) {
            console.log("bubbles called");
            // chart.selectedKeys = ["Portland"];
            var selector = element[0];
            if(d3.select('bubble-chart svg')) {
              d3.select('bubble-chart svg').remove();
              d3.select('bubble-chart div').remove();
            }
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(e) {
                var selectedBubbleNodes = {};
                scope.selectedTopics.forEach( function(topic) {
                  selectedBubbleNodes[topic] = [];
                });
                e.forEach( function(node) {
                  if (node.selected) {
                    var nodeSubj =  node.topic.toLowerCase().replace(/\s/g, '_');
                    nodeInfo = {topic: nodeSubj, name: node.name};
                    selectedBubbleNodes[nodeSubj].push(nodeInfo);
                  }
                });
                updateSelections(scope.selectedNodes, selectedBubbleNodes);
                scope.$apply();
              });
          });

          function updateSelections(oldValues, newValues) {
            scope.selectedTopics.forEach( function(topic) {
              oldValues[topic] = newValues[topic];
            });
          }
        }
      };

    });
  })();
