(function() {
  angular.module('plodab')
    .directive('timelineChart', function() {
      var chart = Timeline();
      return {
        restrict: 'E',
        scope: {
          data: '=',
          key: '=',
          timelineDataWatcher: '='
        },
        link: function(scope, element, attrs) {
          scope.$watch('data', function(newData, oldData) {
            console.log("calling timeline");
            var selector = element[0];
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(d) {
                scope.key = chart.selectedKey;
                scope.$apply();
              });
          });
          scope.$watch('timelineDataWatcher', function(newData, oldData) {
            console.log('arg: ', newData, scope.data);
            scope.timelineDataWatcher = true;
            console.log("calling timeline");
            var selector = element[0];
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
            d3.select(selector)
              .datum(scope.data)
              .call(chart)
              .on("click", function(d) {
                scope.key = chart.selectedKey;
                scope.$apply();
              });
          });
        }
      };
    });

})();
