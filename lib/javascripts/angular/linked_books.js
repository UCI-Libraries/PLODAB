(function() {

  angular.module('plodab')
    .controller('chartctrl', ['$scope', 'dataService', 'timelineDataService', function ($scope, dataService, timelineDataService) {
      init();

      var data;

      function init() {

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: dataSets.colors.subjects},
          {name: "materials", display: "Materials", color: dataSets.colors.materials},
          {name: "techniques", display: "Techniques", color: dataSets.colors.techniques},
          {name: "place_of_publication", display: "Place of Publication", color: dataSets.colors.placeofpublication}
        ];

        dataService.getData(function(promise){
          promise.then(
            function(returnedData) {
              data = returnedData;
              getTimelineData();
              // getBubbleData();
              setChartData();

            })
            .catch(
              function(reason) {
                console.log(reason);
              }
            );
        });

        function getTimelineData() {
          timelineDataService.getTimelineData(function(promise){
            promise.then(
              function(returnedData) {
                $scope.timelineData = returnedData;
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, data);
        }

        function getBubbleData() {
          chartDataService.getBubbleData(function(promise){
            promise.then(
              function(returnedData) {
                $scope.timelineData = returnedData.subjects;
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, data);
        }

        $scope.treeData = dataSets.artifacts[0];

        $scope.selectedTopics = ["subjects"];

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
        console.log("Hello");
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
        template: '<tree-chart-container></tree-chart-container>'
      };
    })
    .directive('treeChartContainer', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        template: '<tree-chart data="treeData"></tree-chart>'
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
    })
    .directive('helloWorld', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        transclude: true,
        template: 'hello <div ng-transclude></div>'
      };
    })
    .directive('world', function() {
      return {
        restrict: 'E',
        scope: {
          data: '='
        },
        transclude: true,
        template: '<span> world</span>'
      };
    });

})();
