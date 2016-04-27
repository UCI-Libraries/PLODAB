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

              resetAllStoredSelections();

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
                  if (chart.selectedKeys.length === 0){
                    resetAllStoredSelections();
                  } else {
                    resetLocalStoredSelections();
                    e.forEach( function(node) {
                      if (node.selected) {
                        var nodeSubj =  node.topic.toLowerCase().replace(/\s/g, '_');
                        nodeInfo = {topic: nodeSubj, name: node.name};
                        selectedBubbleNodes[nodeSubj].push(nodeInfo);
                      }
                    });
                  }
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
                if (chart.selectedKeys.length === 0){
                  resetAllStoredSelections();
                } else {
                  resetLocalStoredSelections();
                  e.forEach( function(node) {
                    if (node.selected) {
                      var nodeSubj =  node.topic.toLowerCase().replace(/\s/g, '_');
                      nodeInfo = {topic: nodeSubj, name: node.name};
                      selectedBubbleNodes[nodeSubj].push(nodeInfo);
                    }
                  });
                }
                updateSelections(scope.selectedNodes, selectedBubbleNodes);
                scope.$apply();
              });
          });

          function updateSelections(globalValues, localValues) {
            scope.selectedTopics.forEach( function(topic) {
              globalValues[topic] = localValues[topic];
            });
          }

          function resetAllStoredSelections() {
            scope.selectedNodes = {
              subjects: [],
              materials: [],
              techniques: [],
              place_of_publication: []
            };
            selectedBubbleNodes = {
              subjects: [],
              materials: [],
              techniques: [],
              place_of_publication: []
            };
          }

          function resetLocalStoredSelections() {
            selectedBubbleNodes = {
              subjects: [],
              materials: [],
              techniques: [],
              place_of_publication: []
            };
          }
        }
      };

    }]);
  })();
