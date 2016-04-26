(function() {
  angular.module('plodab')
    .directive('bubbleChart', ['$timeout', function($timeout) {
      var chart = Bubbles();
      var selectedBubbleNodes = {
        subjects: [],
        materials: [],
        techniques: [],
        place_of_publication: []
      };

      return {
        restrict: 'E',
        scope: {
          bubbleData: '=',
          selectedNodes: '=',
          selectedTopics: '=',
          passedTreeData: "="},
        link: function(scope, element, attrs) {

          scope.changeBubbleChartWithSelection = function(selection) {
            if (selection.name !== "") {
              chart.selectedKeys = [selection.name];
              scope.selectedNodes = {
                subjects: [],
                materials: [],
                techniques: [],
                place_of_publication: []
              };

              scope.selectedTopics = [selection.topic];

              selectedBubbleNodes[selection.topic].push(
                {name: selection.name,
                topic: selection.topic});

              scope.selectedNodes[selection.topic].push(
                {name: selection.name,
                topic: selection.topic});

              $timeout(function(){});

              var selector = element[0];
              if(d3.select('bubble-chart svg')) {
                d3.select('bubble-chart svg').remove();
                d3.select('bubble-chart div').remove();
              }
              d3.select(selector)
                .datum(scope.bubbleData.dataSet)
                .call(chart)
                .on("click", function(e) {
                  e.forEach( function(node) {
                    if (node.selected) {
                      var nodeSubj =  node.topic.toLowerCase().replace(/\s/g, '_');
                      nodeInfo = {topic: nodeSubj, name: node.name};
                      selectedBubbleNodes[nodeSubj].push(nodeInfo);
                    }
                  });
                  updateSelections(scope.selectedNodes, selectedBubbleNodes);
                  $timeout(function(){});
                });
              }
          };

          scope.$watch('passedTreeData', function(newData, oldData) {
            scope.changeBubbleChartWithSelection(newData);
          }, true);

          scope.$watch('bubbleData.dataSet', function(newData, oldData) {
            console.log("bubbles called");
            var selector = element[0];
            if(d3.select('bubble-chart svg')) {
              d3.select('bubble-chart svg').remove();
              d3.select('bubble-chart div').remove();
            }
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(e) {
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

    }]);
  })();
