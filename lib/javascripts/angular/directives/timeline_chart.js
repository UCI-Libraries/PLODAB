(function() {
  angular.module('plodab')
    .directive('timelineChart', function() {
      var chart = Timeline();
      return {
        restrict: 'E',
        scope: {
          data: '='
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
              .call(chart);
          });
        }
      };
    });

})();
