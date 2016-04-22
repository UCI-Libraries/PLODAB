(function() {
  angular.module('plodab')
    .directive('toggleBar', function() {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          positionLeft: '='
        },
        link: function(scope, element, attrs) {
          scope.$watch('positionLeft', function(newData, oldData) {
            console.log("toggle clicked, directive");
          });

          element.bind("click", function() {
            scope.positionLeft = !scope.positionLeft;
            scope.$apply();
          });
        }
      };
    });
})();
