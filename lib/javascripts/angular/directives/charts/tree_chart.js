(function() {
  angular.module('plodab')
    .directive('treeChart', function() {
      var chart = Tree();
      return {
        restrict: 'E',
        scope: {
          data: '=',
          treeSelection: '=',
          resetBubbleChartFromTree: '&'
        },
        link: function(scope, element, attrs) {

          scope.$watch('data', function(data) {
            var selector = element[0];
            console.log("calling tree", data);
            if (data.key) {
              if(d3.select('tree-chart svg')) {
                d3.select('tree-chart svg').remove();
                d3.select('tree-chart div').remove();
              }
              d3.select(selector)
                .datum(data)
                .call(chart)
                .on("click", function() {
                  // if (scope.treeSelection.name && chart.selectedTopic.name) {
                    if (scope.treeSelection.name !== chart.selectedTopic.name) {
                      scope.treeSelection.name = chart.selectedTopic.name;
                      scope.treeSelection.topic = chart.selectedTopic.topic;                      
                      console.log("directive level tree topic change", scope.treeSelection.name);
                      scope.resetBubbleChartFromTree();
                      scope.$apply();
                    }
                  // }
                });
              }
          });
        }
      };
    });
})();
