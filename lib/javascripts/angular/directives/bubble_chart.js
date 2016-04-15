(function() {
  angular.module('plodab')
    .directive('bubbleChart', function() {
      var chart = Bubbles();

      return {
        restrict: 'E',
        scope: {
          bubbleData: '=',
          selectedNodes: '='
        },
        link: function(scope, element, attrs) {

          scope.$watch('bubbleData.dataSet', function(newData, oldData) {
            var selector = element[0];
            if(d3.select('bubble-chart svg')) {
              d3.select('bubble-chart svg').remove();
              d3.select('bubble-chart div').remove();
            }
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(e) {
                var selectedBubbleNodes = [];
                e.forEach( function(node) {
                  if (node.selected) {
                    selectedBubbleNodes.push(node);
                  }
                });
                scope.selectedNodes = selectedBubbleNodes;
                scope.$apply();
              });
          });
        }
      };
    });
  })();
