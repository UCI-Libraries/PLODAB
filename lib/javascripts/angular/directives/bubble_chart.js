(function() {
  angular.module('plodab')
    .directive('bubbleChart', function() {
      var chart = Bubbles();

      return {
        restrict: 'E',
        scope: {
          bubbleData: '=',
          selectedNodes: '=selectedData'
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
                var chicken = [];
                e.forEach( function(node) {
                  if (node.selected) {
                    chicken.push(node);
                  }
                  console.log(chicken);
                });
              });
            // scope.bubbleData.selectedData = chart.selectedKeys;
          });

          scope.$on('elementClick.directive', function(event, data) {
            console.log(event);
          });

        }
      };
    });
  })();
