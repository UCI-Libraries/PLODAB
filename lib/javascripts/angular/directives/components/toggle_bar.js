(function() {
  angular.module('plodab')
    .directive('toggleBar', function() {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          togglePanelView: '&',
          treeActivated: '='
        },
        link: function(scope, element, attrs) {
          element.bind("click", function() {
            if (scope.treeActivated) {
              scope.togglePanelView();
              scope.$apply();
            }
          });
        }
      };
    });
})();
