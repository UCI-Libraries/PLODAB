(function() {

  angular.module('plodab', [])
    .controller('chartctrl', ['$scope', function ($scope) {
      init();

      function init() {

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: dataSets.colors.subjects},
          {name: "materials", display: "Materials", color: dataSets.colors.materials},
          {name: "techniques", display: "Techniques", color: dataSets.colors.techniques},
          {name: "place_of_publication", display: "Place of Publication", color: dataSets.colors.placeofpublication}
        ];

        $scope.selectedTopics = ["subjects"];
        setChartData();

        $scope.timelineData = dataSets.timeline;

        $scope.treeData = dataSets.artifacts[0];
      }

      // $scope functions

      $scope.updateSubjects = function(e) {
        if (chartIncludes($scope.selectedTopics, e.target.value)) {
          // e.targe;
          removeElement($scope.selectedTopics, e.target.value);
        } else {
          $scope.selectedTopics.push(e.target.value);
        }
      };

      $scope.$watch('selectedTopics', function() {
          setChartData();
      }, true);

      // private functions

      function chartIncludes(arr, k) {
        for(var i=0; i < arr.length; i++){
          if( arr[i] === k || ( arr[i] !== arr[i] && k !== k ) ){
            return true;
          }
        }
        return false;
      }

      function removeElement(arr, k) {
        var index;
        if (arr.indexOf) {
          index = arr.indexOf(k);
        }
        else {
          for (index = arr.length - 1; index >= 0; --index) {
            if (array[index] === k) {
              break;
            }
          }
        }
        if (index >= 0) {
          arr.splice(index, 1);
        }
      }

      function makeData() {
          var data = [];
          $scope.selectedTopics.forEach( function(el) {
            data = data.concat(dataSets[el]);
          });
          return data;
      }

      function setChartData() {
        $scope.bubbleChartData = makeData();
      }

    }])


    .directive('bubbleChart', function() {
      var chart = Bubbles();
      // chart.width = 400;
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {

          scope.$watch('data', function(data) {
            var selector = element[0];
            // console.log(selector);
            if(d3.select('bubble-chart svg')) {
              d3.select('bubble-chart svg').remove();
              d3.select('bubble-chart div').remove();
            }
            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    })

    .directive('timelineChart', function() {
      var chart = Timeline();
      // console.log('timeline() output: ', chart);
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {

          scope.$watch('data', function(data) {
            // console.log('in timeline watcher: ', data);
            // console.log('timeline chart:', chart);
            var selector = element[0];

            d3.select(selector)
              .datum(data)
              .call(chart);
          });
        }
      };
    })
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
    })
    .directive('plodabTool', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    })
    .directive('treeChartContainer', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    })
    .directive('bubbleChartContainer', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    })
    .directive('viewToggle', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<div></div>'
      };
    });

})();
