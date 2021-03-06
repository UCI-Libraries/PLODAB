(function() {
  angular.module('plodab')
    .directive('timelineChart', function() {
      var chart = Timeline();
      chart.selectedKey = "";
      return {
        restrict: 'E',
        scope: {
          data: '=',
          key: '=',
          timelineDataWatcher: '=',
          togglePanelView: '&'
        },
        link: function(scope, element, attrs) {
          scope.$watch('data', function(newData, oldData) {
            var selector = element[0];
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
            chart.selectedKey = scope.key;
            d3.select(selector)
              .datum(newData)
              .call(chart)
              .on("click", function(d) {
                if (chart.selectedKey !== "") {
                  scope.key = chart.selectedKey;
                  scope.togglePanelView();
                  scope.$apply();
                }
              });
          });
          scope.$watch('timelineDataWatcher', function(newData, oldData) {
            scope.timelineDataWatcher = true;
            var selector = element[0];
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
            chart.selectedKey = scope.key;
            d3.select(selector)
              .datum(scope.data)
              .call(chart)
              .on("click", function(d) {
                if (chart.selectedKey !== "") {
                  scope.key = chart.selectedKey;
                  scope.togglePanelView();
                  scope.$apply();
                }
              });
          });
        }
      };
    });

})();
