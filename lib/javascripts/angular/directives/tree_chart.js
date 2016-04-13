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

            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    });
})();
