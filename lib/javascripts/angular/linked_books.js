(function() {

  angular.module('plodab')
    .controller('chartctrl', ['$scope', 'dataService', 'timelineDataService', 'bubbleDataService', function ($scope, dataService, timelineDataService, bubbleDataService) {

      init();
      var data;

      function init() {
        $scope.timelineData = [];
        $scope.bubbleChartData = {};
        $scope.bubbleChartData.subjects = [];
        $scope.bubbleChartData.materials = [];
        $scope.bubbleChartData.techniques = [];
        $scope.bubbleChartData.place_of_publication = [];
        $scope.selectedTopics = ["subjects"];

        $scope.topicButtons = [
          {name: "subjects", display: "Subjects", color: dataSets.colors.subjects},
          {name: "materials", display: "Materials", color: dataSets.colors.materials},
          {name: "techniques", display: "Techniques", color: dataSets.colors.techniques},
          {name: "place_of_publication", display: "Place of Publication", color: dataSets.colors.place_of_publication}
        ];

        dataService.getData(function(promise){
          promise.then(
            function(returnedData) {
              data = returnedData;
              getTimelineData();
              getBubbleData();
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
          bubbleDataService.getBubbleData(function(promise){
            promise.then(
              function(returnedData) {
                $scope.bubbleChartData.subjects = returnedData.subjects;
                $scope.bubbleChartData.materials = returnedData.materials;
                $scope.bubbleChartData.techniques = returnedData.techniques;
                $scope.bubbleChartData.place_of_publication = returnedData.place_of_publication;
              })
              .catch(
                function(reason) {
                  console.log(reason);
                }
              );
          }, data);
        }

        $scope.treeData = dataSets.artifacts[0];


      }

      // $scope functions

      $scope.updateSubjects = function(e) {
        if (chartIncludes($scope.selectedTopics, e.target.value)) {
          removeElement($scope.selectedTopics, e.target.value);
        } else {
          $scope.selectedTopics.push(e.target.value);
        }
      };

      $scope.$watch('selectedTopics', function() {
        console.log($scope.selectedTopics);
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
            data = data.concat($scope.bubbleChartData[el]);
            console.log($scope.bubbleChartData, el);
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
            var selector = element[0];
            console.log(selector);
            if(d3.select('timeline-chart svg')) {
              d3.select('timeline-chart svg').remove();
              d3.select('timeline-chart div').remove();
            }
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
