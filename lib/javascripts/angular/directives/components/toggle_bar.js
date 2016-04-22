(function() {
  angular.module('plodab')
    .directive('toggleBar', function() {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          // positionLeft: '=',
          togglePanelView: '&'
        },
        link: function(scope, element, attrs) {
          element.bind("click", function() {
            scope.togglePanelView();
            scope.$apply();
          });
        }
      };
    });
})();
