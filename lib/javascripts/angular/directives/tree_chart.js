(function() {
  angular.module('plodab')
    .directive('treeChart', function() {
      var chart = Tree();
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {

          scope.$watch('data', function(data) {
            var selector = element[0];
            console.log("calling tree");
            if(d3.select('tree-chart svg')) {
              d3.select('tree-chart svg').remove();
              d3.select('tree-chart div').remove();
            }
            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    });
})();
